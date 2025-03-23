import { ModelPicker } from "./ModelPicker"
import { litellmDefaultModelId } from "../../../../src/shared/api"

export const LiteLLMModelPicker = () => (
	<ModelPicker
		defaultModelId={litellmDefaultModelId}
		modelsKey="litellmModels"
		configKey="litellmModelId"
		infoKey="litellmModelInfo"
		refreshMessageType="refreshLiteLLMModels"
		serviceName="LiteLLM"
		serviceUrl="https://docs.litellm.ai/docs/providers"
		recommendedModel="anthropic/claude-3-5-sonnet"
	/>
)
