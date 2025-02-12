import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { memo } from "react"
// import VSCodeButtonLink from "./VSCodeButtonLink"
// import { getOpenRouterAuthUrl } from "./ApiOptions"
// import { vscode } from "../utils/vscode"

interface AnnouncementProps {
	version: string
	hideAnnouncement: () => void
}
/*
You must update the latestAnnouncementId in ClineProvider for new announcements to show to users. This new id will be compared with whats in state for the 'last announcement shown', and if it's different then the announcement will render. As soon as an announcement is shown, the id will be updated in state. This ensures that announcements are not shown more than once, even if the user doesn't close it themselves.
*/
const Announcement = ({ version, hideAnnouncement }: AnnouncementProps) => {
	return (
		<div
			style={{
				backgroundColor: "var(--vscode-editor-inactiveSelectionBackground)",
				borderRadius: "3px",
				padding: "12px 16px",
				margin: "5px 15px 5px 15px",
				position: "relative",
				flexShrink: 0,
			}}>
			<VSCodeButton
				appearance="icon"
				onClick={hideAnnouncement}
				style={{ position: "absolute", top: "8px", right: "8px" }}>
				<span className="codicon codicon-close"></span>
			</VSCodeButton>
			<h2 style={{ margin: "0 0 8px" }}>س-١٨ فى خدمتك 🔥</h2>

			<p style={{ margin: "5px 0px" }}>
				أول اصدار لمساعد برمجيات مفتوح المصدر متطور قادر على تبنى ٨ أدوار مختلفة و سنزيد من قدراتهم فى الأيام
				المقبلة
			</p>

			<p style={{ margin: "5px 0px" }}>
				فريق متكامل من المساعدين فى كل التخصصات التى يحتاجها تطوير البرمجيات
				<ul style={{ margin: "4px 0 6px 20px", padding: 0 }}>
					<li>مدير مشاريع يهتم بتنسيق وترتيب و متابعة المهام</li>
					<li>مدير منتجات يتابع السيناريوهات النختلفة ورحلة العميل</li>
					<li>مدير تقنى يساعدك على حل المشكلات وتصميم الأنظمة</li>
					<li>مدير جودة يساعدك على تطوير اختبارات</li>
				</ul>
				اضغط على أيقونة الدفتر <span className="codicon codicon-notebook" style={{ fontSize: "14px" }}></span>
				لاضافة أو مراجعة تعليمات النموذج
			</p>

			<h3 style={{ margin: "12px 0 8px" }}>شاركنا فى تطوير أفضل مساعد لجيل المطورين العرب</h3>
			<p style={{ margin: "5px 0px" }}>
				شاركنا بأفكارك ومشاريعك التى ستنتجها بمساعدة س-١٨ 💡{" "}
				<VSCodeLink href="https://qabilah.com/hashtag/س18" style={{ display: "inline" }}>
					https://qabilah.com/hashtag/س18
				</VSCodeLink>
				.
			</p>
			<p style={{ margin: "5px 0px" }}>
				ترقبوا الإصدار القادم للفرق الاحترافية التي تتعاون في مشاريع كبيرة 💎{" "}
				<VSCodeLink href="https://github.com/code-quests/seen-18" style={{ display: "inline" }}>
					https://github.com/code-quests/seen-18
				</VSCodeLink>
				.
			</p>
		</div>
	)
}

export default memo(Announcement)
