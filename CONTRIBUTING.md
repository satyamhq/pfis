# Contributing to PFIS

Thank you for your interest in contributing to the **Patient Friction Intelligence System (PFIS)**! We welcome contributions from software engineers, data scientists, healthcare researchers, and designers committed to dismantling non-clinical barriers in public health.

---

## 1. Code of Conduct

As contributors and maintainers of PFIS, we pledge to foster an inclusive, welcoming, and harassment-free community. Treat all community members with respect and courtesy regardless of background, gender, identity, or technical experience.

---

## 2. Core Architectural Directive: The Non-Clinical Boundary

PFIS operates exclusively on **non-clinical healthcare friction factors**:
- Travel distance, terrain, and transport connectivity
- Financial accessibility and out-of-pocket costs
- Documentation, identity records, and scheme eligibility
- Digital literacy and mobile hardware availability
- Language, dialect, and literacy accommodations
- Referral continuum and diagnostic center reach

> **CRITICAL DIRECTIVE**: Under no circumstances should Pull Requests introduce clinical diagnosis tools, medical symptom checkers, drug dosage calculators, prescription managers, or clinical advice algorithms into PFIS.

---

## 3. Contribution Workflow

### 3.1 Branching Strategy
1. Fork the repository and create a feature branch off `main`:
   ```bash
   git checkout -b feat/add-asha-routing-telemetry
   ```
2. Keep your branch updated with the upstream `main` branch:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### 3.2 Commit Message Format
We follow the **Conventional Commits** specification:
- `feat: add offline caching for patient requests`
- `fix: correct calculation of travel distance decay curve`
- `perf: split vendor chunks in Vite rollup output`
- `docs: update deployment instructions for Docker Compose`
- `test: add automated test coverage for admin privilege escalation`
- `refactor: standardize Lucide SVG icons in hospital cards`

---

## 4. Coding Standards

- **TypeScript**: Strive for strict typing; avoid the use of `any` whenever an interface can be defined.
- **UI & Styling**: Use Tailwind CSS design tokens (`teal-600`, `slate-900`, etc.) and `lucide-react` SVG icons. Avoid raw platform-dependent Unicode emojis in functional UI elements.
- **Localization**: Never hardcode English strings in new UI components. Register strings in `client/src/i18n/locales/` across all supported languages.
- **Code Splitting**: Top-level routes registered in [App.tsx](file:///d:/PFIS-Patient-Friction-Intelligence-System/client/src/App.tsx) must be dynamically imported via `React.lazy()` with `Suspense`.

---

## 5. Quality Assurance Checklist

Before opening a Pull Request, ensure that:

- [ ] `npm run build` exits with code 0 on both `server` and `client`.
- [ ] No chunk warning is emitted during Vite production bundling.
- [ ] `npm test` passes 100% across all API and RBAC test suites.
- [ ] New endpoints are documented in [API.md](file:///d:/PFIS-Patient-Friction-Intelligence-System/API.md).
- [ ] No secrets, passwords, or personal API keys are committed.
- [ ] All code conforms to existing repository formatting standards.
