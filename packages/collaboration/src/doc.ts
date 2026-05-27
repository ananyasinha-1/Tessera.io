// ──────────────────────────────────────────────────────────────
// @tessera/collaboration — Yjs document factory
// ──────────────────────────────────────────────────────────────

import * as Y from "yjs";
import type { CollaborationRoom } from "@tessera/shared-types";

/**
 * Configuration for creating a collaborative document instance.
 */
export interface CollaborationDocOptions {
  /** Room metadata to associate with this document. */
  readonly room: CollaborationRoom;
}

/**
 * Wrapper around a Yjs Doc that provides typed access to
 * the shared text used by the Monaco editor binding.
 */
export interface CollaborationDoc {
  /** The underlying Yjs document. */
  readonly ydoc: Y.Doc;
  /** The shared text type bound to the editor. */
  readonly ytext: Y.Text;
  /** Room metadata. */
  readonly room: CollaborationRoom;
  /** Tear down the document and free resources. */
  destroy(): void;
}

/**
 * Creates a new Yjs document instance bound to a collaboration room.
 *
 * The returned `ytext` is the shared text type that should be bound
 * to Monaco via `y-monaco`, and to the sync-server via a WebSocket
 * provider.
 */
export function createCollaborationDoc(
  options: CollaborationDocOptions,
): CollaborationDoc {
  const ydoc = new Y.Doc();
  const ytext = ydoc.getText("monaco");

  return {
    ydoc,
    ytext,
    room: options.room,
    destroy() {
      ydoc.destroy();
    },
  };
}
