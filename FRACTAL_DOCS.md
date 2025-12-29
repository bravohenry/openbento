# Fractal Documentation System (FractalFlow Documentation System)

## 📌 Core Synchronization Protocol (Mandatory)

**Status: The "soul" and mandatory regulations of the system**

1. **"Atomic Update Rule"**: Any update to functionality, architecture, or implementation patterns MUST be immediately synchronized with the corresponding directory or sub-document after code changes are completed.
2. **"Reverse Trigger Chain"**: File change → Update file Header → Update parent folder MD → (If global impact) Update main MD.
3. **"Fractal Self-Consistency"**: Ensure that at any subdirectory level, AI can rebuild its local worldview through that directory's MD file.

> **⚠️ CRITICAL: Any change to functionality, architecture, or implementation patterns MUST be followed by updating the relevant documentation in affected directories.**

---

## Documentation Hierarchy Structure

### Level 1: Root Directory Master Document (/README.md)

**Status: The "soul" and mandatory regulations of the system**

The root README.md defines the core synchronization protocol and top-level architecture of the entire project. It describes:
- Core synchronization protocol (Mandatory)
- Top-level architecture division
- Documentation hierarchy structure
- Update propagation rules

### Level 2: Folder-Level Architecture Documentation (.folder.md)

**Status: Local map (Three-line minimalism principle)**

Each major folder should contain a `.folder.md` file, following the three-line minimalism principle:

1. **"Status"**: The folder's position and role in the system
2. **"Logic"**: Core logic flow
3. **"Constraints"**: Constraints that must be followed

**Format Example:**

```markdown
# Folder: /src/bento/core

1. **"Status"**: Atomic-level implementation of Bento cards, defining the visual structure, size system, and composition patterns.
2. **"Logic"**: Provides BentoCard and its sub-components through Compound Component pattern.
3. **"Constraints"**: All calculations must be idempotent, direct DOM manipulation is prohibited.

## 🧩 Member List

- `BentoCard.tsx`: Main card component
- `BentoContext.tsx`: State management Context

⚠️ **Trigger**: Once files are added or architecture logic is adjusted in this folder, immediately rewrite this document.
```

### Level 3: File Header Comments (File Header)

**Status: Fine-grained information (In/Out/Pos protocol)**

All critical files should include standardized Header comments at the beginning, describing:

- **[INPUT]**: Input parameters and dependencies
- **[OUTPUT]**: Outputs and return values
- **[POS]**: Position and role in the system
- **[PROTOCOL]**: Update protocol

**Format Example:**

```typescript
/**
 * [INPUT]: (BentoCardProps, BentoCard.styles, cn) - Card properties, style constants, style utility
 * [OUTPUT]: (BentoCard compound component) - Card component and its sub-components
 * [POS]: Located at /bento/core atomic component, all Widgets are built on this.
 * 
 * [PROTOCOL]:
 * 1. Once this file's logic changes, this Header must be synchronized immediately.
 * 2. After update, must check upward whether /src/bento/core/.folder.md description is still accurate.
 */
```

---

## Update Propagation Rules

### Reverse Trigger Chain

```
File change 
  ↓
Update file Header (if logic changes)
  ↓
Check if parent folder .folder.md needs updating
  ↓
(If global impact) Update main README.md
```

### Specific Operation Flow

1. **Modify a single file**:
   - If logic changes, update file Header
   - Check if parent folder `.folder.md` needs updating

2. **Modify folder structure**:
   - Update folder `.folder.md`
   - Check if parent-level documentation needs updating

3. **Global architecture impact**:
   - Update root `README.md`
   - Update related top-level documentation

---

## Design Philosophy

### 1. Solving AI's "Context Mid-loss"

By compressing information density to the **shortest path (three lines)**, when AI enters any subdirectory, the first thing it sees is a **minimalist "local map"**, and attention weights instantly focus precisely.

### 2. Establishing "End-to-End Loop" (Self-Healing Loop)

Through "once... must..." triggers, documentation becomes **code's "shadow variable"**. By adding **synchronization actions** at the end of code modifications, the system gains **self-healing capabilities**.

### 3. Fractal Structure's "Holographic Projection"

- **Local affects global**: When a file's Input changes, AI is forced to look at file-level MD
- **Global constrains local**: When folder MD specifies constraints, AI automatically produces logical pruning when modifying specific files

### 4. GEB's Aesthetic Practice: Self-Reference and Isomorphism

- Files describe how they are modified
- Folders describe how files collaborate
- Root directory describes how the entire system grows

**Result**: AI is no longer an external "code repair worker", it becomes part of this **growing system**, reshaping its own mind map while modifying code.

---

## Operation Recommendations

1. **Immediate action**: Write these rules into the project's `.cursorrules` (completed)
2. **Gradual migration**: Gradually convert existing `ARCHITECTURE.md` to `.folder.md` format
3. **Continuous maintenance**: Immediately update related documentation after each code modification

---

**Inspired by structural thinking and "Gödel, Escher, Bach: An Eternal Golden Braid"**
