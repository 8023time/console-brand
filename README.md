# Console Brand

一个用于在浏览器控制台输出富样式日志（Badge、Gradient、Image、Emoji、ASCII 等）的轻量工具包，配套一个用于在 UI 中配置样式的控制面板组件集合（基于 React + TypeScript + Tailwind + Ant Design）。

**主要功能**
- 丰富的控制台日志风格：文本、Badge（标签/值）、渐变背景、图片、ASCII 艺术、Emoji、JSON/表格等。
- 可复用的样式工具与预设（`Presets`），方便统一风格输出。
- UI 控制面板组件：`StyleControls`、颜色选择器、表单项等，用于可视化调整日志样式并实时预览。
- 国际化支持（`react-i18next`），易于本地化界面文案。

**技术栈**
- React + TypeScript
- Vite 构建工具
- Tailwind CSS（样式）
- Ant Design（UI 表单控件）
- ESLint + Prettier（代码质量与格式化）

**安装（开发）**

在有 `pnpm` 的环境下：

```powershell
pnpm install
pnpm run dev
```

**基本用法（示例）**

在代码中引入并使用控制台输出工具：

```ts
import { prettyLog, logBadge, Presets } from '@/lib';

prettyLog('Hello world', Presets.SUCCESS);
logBadge({ label: 'Build', value: 'Success', labelBg: '#059669', valueBg: '#064e3b' });
```

UI 组件 `StyleControls` 用于在侧边栏或面板中调整样式并通过回调将配置传回上层组件，示例见 `src/components/ui/StyleControls`。

**代码规范**
- 使用 `pnpm run lint` 运行 ESLint 检查。
- 使用 `pnpm run format` 运行 Prettier 格式化。

**贡献**
- 欢迎提交 Issue 和 PR：请先打开 Issue 说明你的想法，再发起 PR。
- 提交前请运行 `pnpm run lint` 与 `pnpm run format`，并确保单元/集成测试通过（如有）。

**许可**
MIT
