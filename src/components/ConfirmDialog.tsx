import * as React from "react";
import { Button } from "./Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./Dialog";

export interface ConfirmDialogProps {
  open: boolean;
  title: React.ReactNode;
  /** Explains the consequence; omit only when the title already says it all. */
  description?: React.ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  /** Renders the confirm action as `danger` and moves initial focus to Cancel. */
  destructive?: boolean;
  /** Shows a spinner on the confirm action and disables both while the confirmation runs. */
  loading?: boolean;
  onConfirm: () => void;
  /** Also fired by Escape and by clicking outside. */
  onCancel: () => void;
}

/**
 * Yes/no confirmation built on `Dialog`, exposed as `role="alertdialog"` so
 * assistive tech announces it as requiring a response. Use it instead of
 * `window.confirm` for anything irreversible. With `destructive`, initial
 * focus lands on Cancel (the safe action) and the confirm action is the
 * `danger` variant; otherwise focus lands on the confirm action. Fully
 * controlled: the caller owns `open` and clears it from both callbacks.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  destructive,
  loading,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const confirmRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !loading) onCancel();
      }}
    >
      <DialogContent
        role="alertdialog"
        hideClose
        // Radix links DialogDescription automatically; only when there is
        // none is the attribute set explicitly, which also silences Radix's
        // missing-description warning.
        {...(description ? {} : { "aria-describedby": undefined })}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          (destructive ? cancelRef : confirmRef).current?.focus();
        }}
      >
        <DialogHeader className="pe-0">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <Button ref={cancelRef} variant="secondary" disabled={loading} onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            ref={confirmRef}
            variant={destructive ? "danger" : "primary"}
            loading={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
