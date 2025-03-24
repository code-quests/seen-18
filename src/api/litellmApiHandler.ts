import axios, { AxiosRequestConfig } from "axios"
import { ApiConfiguration, ModelInfo } from "../shared/api"
import { LITELLM_BASE_URL } from "../shared/constants"
import { ApiHandler } from "./index"
// Import only the type, not trying to use it as a constructor
import type { ApiStream } from "./transform/stream"

export function createLiteLLMApiHandler(config: ApiConfiguration): ApiHandler {
	console.log("baseUrl	=========================== ", LITELLM_BASE_URL)
	console.log("config	====================", config)
	const baseUrl = LITELLM_BASE_URL
	const apiKey = config.litellmApiKey
	const modelId = config.litellmModelId || "gpt-3.5-turbo"
	const modelInfo = config.litellmModelInfo as ModelInfo

	return {
		createMessage(systemPrompt: string, messages: any[]): ApiStream {
			// Create an async generator function that implements the ApiStream interface
			const stream = (async function* () {
				const formattedMessages = [
					// { role: "system", content: systemPrompt },
					...messages.map((m) => ({
						role: m.role,
						content: m.content,
					})),
				]

				const axiosConfig: AxiosRequestConfig = {
					headers: {
						"Content-Type": "application/json",
					},
					responseType: "stream",
				}

				if (apiKey) {
					axiosConfig.headers = {
						...axiosConfig.headers,
						Authorization: `Bearer ${apiKey}`,
					}
				}

				try {
					console.log("axiosConfig ::::::::::::::::::::::::::", axiosConfig)
					const response = await axios.post(
						`${baseUrl}/chat/completions`,
						{
							model: modelId,
							messages: formattedMessages,
							stream: true,
							max_tokens: 4096, // Default max tokens
							temperature: 0.7, // Default temperature
						},
						axiosConfig,
					)

					// Create a promise that will resolve with each chunk of data
					const dataPromise = new Promise<string>((resolve, reject) => {
						let buffer = ""

						response.data.on("data", (chunk: Buffer) => {
							const lines = chunk
								.toString()
								.split("\n")
								.filter((line: string) => line.trim() !== "")

							for (const line of lines) {
								if (line.includes("[DONE]")) continue

								try {
									const parsed = JSON.parse(line.replace(/^data: /, ""))
									if (parsed.choices && parsed.choices[0].delta.content) {
										const content = parsed.choices[0].delta.content
										buffer += content
										resolve(buffer)
									}
								} catch (e) {
									console.error("Error parsing SSE:", e, line)
								}
							}
						})

						response.data.on("error", (err: Error) => {
							console.error("Stream error:", err)
							reject(err)
						})

						response.data.on("end", () => {
							resolve(buffer)
						})
					})

					// Yield each chunk of data as it comes in
					while (true) {
						try {
							const text = await dataPromise
							yield { text, done: false }
						} catch (error) {
							console.error("Error in stream:", error)
							throw error
						}
					}
				} catch (error: any) {
					console.error("LiteLLM API error:", error)
					if (error.response) {
						console.error("Response data:", error.response.data)
						console.error("Response status:", error.response.status)
						console.error("Response headers:", error.response.headers)
					}
					throw error
				}

				// Final yield to indicate completion
				yield { text: "", done: true }
			})()

			// Add the throw method to the generator
			stream.throw = (err: Error) => {
				throw err
			}

			// Add the push method (this is a no-op since we're using a generator)
			;(stream as any).push = () => {}

			return stream as ApiStream
		},
		getModel() {
			return {
				id: modelId,
				info: modelInfo,
			}
		},
	}
}
