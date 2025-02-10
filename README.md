<div align="center">
  <h2>Join the Code⚔️Quests Community</h2>
  <p>Compete, Learn and Earn. Work on the best development projects with no interveiw!</p>
  
  <a href="https://www.linkedin.com/company/code-quests" target="_blank"><img src="https://img.shields.io/badge/%F0%9F%94%94_follow_us_on_LinkedIn-blue?style=for-the-badge
  " alt="Follow us on LinkedIn" height="40"></a>

</div>

---

<br>
<div align="center">
<h1>س-١٨ فى خدمة مطورين البرمجيات</h1>

<a href="https://marketplace.visualstudio.com/items?itemName=code-quests.seen18" target="_blank"><img src="https://img.shields.io/badge/⏬ Download%20on%20VS%20Marketplace-blue?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="Download on VS Marketplace"></a>
<a href="https://qabilah.com/hashtag/س18" target="_blank"><img src="https://img.shields.io/badge/💬 Discuss on qabilah-ff6636?style=for-the-badge
  " alt="ناقش س-١٨ على قبيلة" height=""></a>

<a href="https://github.com/code-quests/seen-18/discussions/categories/feature-requests?discussions_q=is%3Aopen+category%3A%22Feature+Requests%22+sort%3Atop" target="_blank"><img src="https://img.shields.io/badge/❓ Feature%20Requests-yellow?style=for-the-badge" alt="Feature Requests"></a>
<a href="https://marketplace.visualstudio.com/items?itemName=code-quests.seen18&ssr=false#review-details" target="_blank"><img src="https://img.shields.io/badge/⭐ Rate%20%26%20Review-green?style=for-the-badge" alt="Rate & Review"></a>

</div>

**Seen-18** is an AI-powered **autonomous coding agent** that lives in your editor. It can:

- Communicate in natural language, english and arabic.
- Read and write files directly in your workspace
- Run terminal commands
- Automate browser actions
- Integrate with any OpenAI-compatible or custom API/model
- Handle different roles like gathering requirements, coding, architecture, devops, QA.
- Cost monitoring, know how much you are spending on prompts!
- detects errors from commands and linters and suggests solutions

Check out the [CHANGELOG](CHANGELOG.md) for detailed updates and fixes.

---

### عن الإسم

س-١٨ هو مقاتل آلي متطور من حضارة أطلانتس، من إبداع الكاتب الراحل نبيل فاروق في سلسلة الخيال العلمي الشهيرة "ملف المستقبل". يتميز بوجه أخضر مخيف وجسم معدني خارق مغطى بثياب نارية حمراء، وقد صُمم لمحاربة الأعداء في العصور القديمة، حيث واجه الهكسوس قبل أن يدخل في سبات عميق. عاد لاحقًا لينضم إلى فريق المخابرات العلمية، ليصبح من أكثر الشخصيات المحبوبة لدى جيل الشباب العربي المهتم بالخيال العلمي والمغامرات.

---

### Code Actions

Seen-18 now integrates directly with VS Code's native code actions system, providing quick fixes and refactoring options right in your editor. Look for the lightbulb 💡 to access Seen-18's capabilities without switching context.

### Enhanced Mode Capabilities

- **Markdown Editing**: Addressing one of the most requested features, Ask and Architect modes can now create and edit markdown files!
- **Custom File Restrictions**: In general, custom modes can now be restricted to specific file patterns (for example, a technical writer who can only edit markdown files 👋). There's no UI for this yet, but who needs that when you can just ask Seen-18 to set it up for you?
- **Self-Initiated Mode Switching**: Modes can intelligently request to switch between each other based on the task at hand. For instance, Code mode might request to switch to Test Engineer mode once it's ready to write tests.

---

### Supports Any API or Model

Use Seen-18 with:

- **OpenRouter**, Anthropic, Glama, OpenAI, Google Gemini, AWS Bedrock, Azure, GCP Vertex, or local models (LM Studio/Ollama)—anything **OpenAI-compatible**.
- Different models per mode. For instance, an advanced model for architecture vs. a cheaper model for daily coding tasks.
- **Usage Tracking**: Seen-18 monitors token and cost usage for each session.

---

### Command Line Integration

Easily run commands in your terminal—Seen-18:

- Installs packages, runs builds, or executes tests.
- Monitors output and adapts if it detects errors.
- Lets you keep dev servers running in the background while continuing to work.

You approve or decline each command, or set auto-approval for routine operations.

---

### Browser Automation

Seen-18 can also open a **browser** session to:

- Launch your local or remote web app.
- Click, type, scroll, and capture screenshots.
- Collect console logs to debug runtime or UI/UX issues.

Ideal for **end-to-end testing** or visually verifying changes without constant copy-pasting.

---

### Adding Tools with MCP

Extend Seen-18 with the **Model Context Protocol (MCP)**:

- “Add a tool that manages AWS EC2 resources.”
- “Add a tool that queries the company Jira.”
- “Add a tool that pulls the latest PagerDuty incidents.”

Seen-18 can build and configure new tools autonomously (with your approval) to expand its capabilities instantly.

---

### Context Mentions

When you need to provide extra context:

- **@file** – Embed a file’s contents in the conversation.
- **@folder** – Include entire folder structures.
- **@problems** – Pull in workspace errors/warnings for Seen-18 to fix.
- **@url** – Fetch docs from a URL, converting them to markdown.
- **@git** – Supply a list of Git commits or diffs for Seen-18 to analyze code history.

Help Seen-18 focus on the most relevant details without blowing the token budget.

---

## Installation

Seen-18 is available on:

- **[VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=code-quests.seen18)**
- **[Open-VSX](https://open-vsx.org/extension/)** Coming soon!

1. **Search “Seen-18”** in your editor’s Extensions panel to install directly.
2. Or grab the `.vsix` file from Marketplace / Open-VSX and **drag-and-drop** into your editor.
3. **Open** Seen-18 from the Activity Bar or Command Palette to start chatting.

> **Tip**: Use `Cmd/Ctrl + Shift + P` → “Seen-18: Open in New Tab” to dock the AI assistant alongside your file explorer.

---

## Local Setup & Development

1. **Clone** the repo:
    ```bash
    git clone https://github.com/code-quests/seen-18.git
    ```
2. **Install dependencies**:
    ```bash
    npm run install:all
    ```
3. **Build** the extension:
    ```bash
    npm run build
    ```
    - A `.vsix` file will appear in the `bin/` directory.
4. **Install** the `.vsix` manually if desired:
    ```bash
    code --install-extension bin/seen-18-1.0.0.vsix
    ```
5. **Start the webview (Vite/React app with HMR)**:
    ```bash
    npm run dev
    ```
6. **Debug**:
    - Press `F5` (or **Run** → **Start Debugging**) in VSCode to open a new session with Seen-18 loaded.

Changes to the webview will appear immediately. Changes to the core extension will require a restart of the extension host.

We use [changesets](https://github.com/changesets/changesets) for versioning and publishing. Check our `CHANGELOG.md` for release notes.

---

## Disclaimer

**Please note** that code-quests ltd, does **not** make any representations or warranties regarding any code, models, or other tools provided or made available in connection with Seen-18, any associated third-party tools, or any resulting outputs. You assume **all risks** associated with the use of any such tools or outputs; such tools are provided on an **"AS IS"** and **"AS AVAILABLE"** basis. Such risks may include, without limitation, intellectual property infringement, cyber vulnerabilities or attacks, bias, inaccuracies, errors, defects, viruses, downtime, property loss or damage, and/or personal injury. You are solely responsible for your use of any such tools or outputs (including, without limitation, the legality, appropriateness, and results thereof).

---

## Contributing

We love community contributions! Here’s how to get involved:

1. **Check Issues & Requests**: See [open issues](https://github.com/code-quests/seen-18/issues) or [feature requests](https://github.com/code-quests/seen-18/discussions/categories/feature-requests).
2. **Fork & branch** off `main`.
3. **Submit a Pull Request** once your feature or fix is ready.

---

## License

[Apache 2.0 © 2025 CodeQuests ltd, Egypt](./LICENSE)
