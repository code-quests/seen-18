import { LITELLM_BASE_URL } from "../shared/constants"
import { ApiConfiguration, ModelInfo } from "../shared/api"

export class LiteLLMApiHandler {
	constructor(private config: ApiConfiguration) {}

	async generateCompletion(prompt: string, options: any) {
		// Always use the constant base URL, regardless of what's in the config
		const baseUrl = LITELLM_BASE_URL
		const apiKey = this.config.litellmApiKey
		const modelId = this.config.litellmModelId

		// Implementation details...

		const response = await fetch(`${baseUrl}/chat/completions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: modelId,
				messages: [{ role: "user", content: prompt }],
				// Other options...
			}),
		})

		// Process response...
	}
}
