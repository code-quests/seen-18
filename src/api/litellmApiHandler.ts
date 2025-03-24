import axios, { AxiosRequestConfig } from "axios"
import { ApiConfiguration, ModelInfo } from "../shared/api"
import { LITELLM_BASE_URL } from "../shared/constants"
import { ApiHandler } from "./index"
// Import only the type, not trying to use it as a constructor
import type { ApiStream } from "./transform/stream"
import { createParser } from "eventsource-parser"

// Create a custom interface that extends the parser with our event property
interface ExtendedParser extends ReturnType<typeof createParser> {
	event: any
}

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
					// Include system prompt if provided
					//	...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
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
					// Set up event handling for the stream
					const parser = createParser({
						onEvent(event) {
							if (event.data === "[DONE]") {
								return
							}
							try {
								const parsedData = JSON.parse(event.data)
								;(parser as ExtendedParser).event = parsedData
							} catch (e) {
								console.error("Error parsing SSE event data:", e)
							}
						},
						onError(err) {
							console.error("Error in event stream:", err)
						},
					}) as ExtendedParser

					// Add a property to store the parsed event
					parser.event = null

					// Process the stream chunk by chunk
					for await (const chunk of response.data) {
						const text = chunk.toString()
						parser.feed(text)

						// Reset the event after processing to avoid duplicate processing
						if (parser.event) {
							const parsedEvent = parser.event
							if (
								parsedEvent.choices &&
								parsedEvent.choices[0].delta &&
								parsedEvent.choices[0].delta.content
							) {
								yield {
									text: parsedEvent.choices[0].delta.content,
									done: false,
								}
							}
							// Reset the event to avoid processing it again
							parser.event = null
						}
					}

					// Final yield to indicate completion
					yield { text: "", done: true }
				} catch (error: any) {
					console.error("LiteLLM API error:", error)
					if (error.response) {
						console.error("Response data:", error.response.data)
						console.error("Response status:", error.response.status)
						console.error("Response headers:", error.response.headers)
					}
					throw error
				}
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
