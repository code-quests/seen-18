import axios, { AxiosRequestConfig } from "axios"
import { ApiConfiguration, ModelInfo } from "../shared/api"
import { LITELLM_BASE_URL } from "../shared/constants"
import { ApiHandler } from "./index"
// Import only the type, not trying to use it as a constructor
import type { ApiStream } from "./transform/stream"
import { createParser } from "eventsource-parser"
import { ApiStreamChunk } from "./transform/stream"

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
		async *createMessage(systemPrompt: string, messages: any[]): AsyncGenerator<ApiStreamChunk> {
			const formattedMessages = [
				// Include system prompt if provided
				...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
				...messages.map((m) => ({
					role: m.role,
					content: m.content,
				})),
			]

			// const formattedMessages = [
			// 	{
			// 	  role:'user',
			// 	  content: 'Hello, I am a software developer. I am looking for a job. Can you help me with that?',
			// 	}
			//   ]

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

			let fullResponseText = ""

			try {
				console.log("Sending request to LiteLLM API:", {
					url: `${baseUrl}/chat/completions`,
					model: modelId,
					messagesCount: formattedMessages.length,
					stream: true,
				})

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

				console.log("LiteLLM API response received, processing stream...")

				// Process the stream chunk by chunk
				for await (const chunk of response.data) {
					const text = chunk.toString()
					// Split the text by lines and process each line
					const lines = text.split("\n").filter((line: string) => line.trim() !== "")

					for (const line of lines) {
						// Check if the line starts with "data: "
						if (line.startsWith("data: ")) {
							const data = line.substring(6)

							// Check if it's the [DONE] marker
							if (data === "[DONE]") {
								console.log("Received [DONE] marker")
								continue
							}

							try {
								const parsedData = JSON.parse(data)
								console.log("Parsed SSE event:", parsedData)

								// Extract content from the delta if available
								if (parsedData.choices && parsedData.choices[0]?.delta?.content) {
									const content = parsedData.choices[0].delta.content
									fullResponseText += content

									yield {
										type: "text",
										text: content,
									}
								}
							} catch (e) {
								console.error("Error parsing SSE event data:", e)
								console.error("Raw event data:", data)
							}
						}
					}
				}

				// Final yield to indicate completion and include usage information if available
				yield {
					type: "usage",
					inputTokens: 0, // LiteLLM might not provide this info in the stream
					outputTokens: 0, // LiteLLM might not provide this info in the stream
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
		},
		getModel() {
			return {
				id: modelId,
				info: modelInfo,
			}
		},
	}
}
