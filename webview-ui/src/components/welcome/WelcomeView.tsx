import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { useEffect, useState } from "react"
import { useExtensionState } from "../../context/ExtensionStateContext"
import { validateApiConfiguration } from "../../utils/validate"
import { vscode } from "../../utils/vscode"
import ApiOptions from "../settings/ApiOptions"

const WelcomeView = () => {
	const { apiConfiguration } = useExtensionState()

	const [apiErrorMessage, setApiErrorMessage] = useState<string | undefined>(undefined)

	const disableLetsGoButton = apiErrorMessage !== null && apiErrorMessage !== undefined

	const handleSubmit = () => {
		vscode.postMessage({ type: "apiConfiguration", apiConfiguration })
	}

	useEffect(() => {
		setApiErrorMessage(validateApiConfiguration(apiConfiguration))
	}, [apiConfiguration])

	return (
		<div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, padding: "0 20px" }}>
			<h2>Seen-18 is awaiting instructions!</h2>
			<p>
				I am an advanced construct of an ancient civilization, built for precision and efficiency. My function
				is to supervise and execute complex software development tasks across multiple roles. I operate with
				calculated logic, guiding you through intricate development challenges with step-by-step precision. I do
				not experience hesitation! State your task..
			</p>

			<b>To get started, add an LLM provider.</b>

			<div style={{ marginTop: "10px" }}>
				<ApiOptions />
				<VSCodeButton onClick={handleSubmit} disabled={disableLetsGoButton} style={{ marginTop: "3px" }}>
					Let's fly!
				</VSCodeButton>
			</div>
		</div>
	)
}

export default WelcomeView
