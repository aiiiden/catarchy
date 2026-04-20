import React, { useEffect, useId, useRef, useState } from "react";
import SelectTriangle from "../assets/select-triangle.svg?react";
import { cn } from "../lib/cn";
import { Box } from "./box";
import { Text } from "./text";

export interface SelectOption<V extends string = string> {
  value: V;
  label: React.ReactNode | ((option: { selected: boolean }) => React.ReactNode);
  disabled?: boolean;
  hidden?: boolean;
}

export interface SelectBoxProps<V extends string = string> {
  value?: V;
  defaultValue?: V;
  placeholder?: string;
  disabled?: boolean;
  options?: SelectOption<V>[];
  className?: string;
  optionContentClassName?: string;
  onChange?: (option: SelectOption<V>) => void;
  onBlur?: () => void;
}

export function SelectBox<V extends string = string>({
  value,
  defaultValue,
  placeholder,
  disabled = false,
  options = [],
  className,
  optionContentClassName,
  onChange,
  onBlur,
}: SelectBoxProps<V>) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = isControlled ? value : internalValue;
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [dropLeft, setDropLeft] = useState(false);
  const [positioned, setPositioned] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const triggerWrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const listId = `${baseId}-list`;
  const optionId = (i: number) => `${baseId}-option-${i}`;

  const resolveLabel = (label: SelectOption["label"], selected: boolean) =>
    typeof label === "function" ? label({ selected }) : label;

  const visibleOptions = options.filter((o) => !o.hidden);
  const selectedOption = options.find((o) => o.value === currentValue);
  const displayLabel = selectedOption ? (
    resolveLabel(selectedOption.label, false)
  ) : placeholder ? (
    <Text className="text-gray-500">{placeholder}</Text>
  ) : null;

  function openList() {
    if (disabled) return;
    setPositioned(false);
    setActiveIndex(
      Math.max(
        0,
        visibleOptions.findIndex((o) => o.value === currentValue),
      ),
    );
    setOpen(true);
  }

  function closeList() {
    setOpen(false);
    setDropUp(false);
    onBlur?.();
  }

  function selectOption(option: SelectOption<V>) {
    if (option.disabled) return;
    if (!isControlled) setInternalValue(option.value);
    onChange?.(option);
    closeList();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) openList();
        else if (visibleOptions[activeIndex])
          selectOption(visibleOptions[activeIndex]);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) openList();
        else setActiveIndex((i) => Math.min(i + 1, visibleOptions.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openList();
        else setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Escape":
      case "Tab":
        closeList();
        break;
    }
  }

  // Determine drop direction after dropdown renders
  useEffect(() => {
    if (!open || !triggerWrapRef.current || !listRef.current) return;
    const triggerRect = triggerWrapRef.current.getBoundingClientRect();
    const listWidth = listRef.current.offsetWidth;
    const listHeight = listRef.current.offsetHeight;
    setDropUp(window.innerHeight - triggerRect.bottom < listHeight + 4);
    setDropLeft(window.innerWidth - triggerRect.left < listWidth);
    setPositioned(true);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (
        !triggerWrapRef.current?.contains(e.target as Node) &&
        !listRef.current?.contains(e.target as Node)
      ) {
        closeList();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div className={cn("relative", className)}>
      <div ref={triggerWrapRef} className="relative">
        <div
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listId}
          aria-activedescendant={
            open && activeIndex >= 0 ? optionId(activeIndex) : undefined
          }
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={() => (open ? closeList() : openList())}
          onKeyDown={handleKeyDown}
          className={cn("outline-none", !disabled && "cursor-pointer")}
        >
          <Box
            rounded
            className="h-9"
            containerClassName={cn(
              "px-2 flex items-center gap-1 select-none h-full",
              disabled && "bg-gradient-dither-3",
            )}
          >
            <span className="flex-1 text-base leading-none min-w-0 truncate">
              {displayLabel}
            </span>
            <SelectTriangle
              className={cn(
                "shrink-0",
                open && "rotate-180",
                disabled && "text-gray-500",
              )}
            />
          </Box>
        </div>

        {open && (
          <Box
            tight
            rounded
            ref={listRef}
            id={listId}
            role="listbox"
            className={cn(
              "absolute min-w-full z-10 py-px",
              !positioned && "invisible",
              dropLeft ? "right-0" : "left-0",
              dropUp ? "bottom-[calc(100%+4px)]" : "top-[calc(100%+4px)]",
              optionContentClassName,
            )}
          >
            <div className="bg-white">
              {visibleOptions.map((option, index) => (
                <div
                  key={option.value}
                  id={optionId(index)}
                  role="option"
                  aria-selected={option.value === currentValue}
                  aria-disabled={option.disabled}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectOption(option);
                  }}
                  onMouseEnter={() => !option.disabled && setActiveIndex(index)}
                  className={cn(
                    "px-2 py-1.5 cursor-pointer not-last:border-b",
                    index === activeIndex &&
                      !option.disabled &&
                      "bg-gradient-dither-2 font-stroke-white active:bg-gradient-dither-1",
                    option.disabled && "cursor-not-allowed",
                  )}
                >
                  {typeof option.label === "string" ? (
                    <Text
                      as={option.disabled ? "s" : "span"}
                      className={cn([option.disabled && "text-gray-500"])}
                    >
                      {option.label}
                    </Text>
                  ) : (
                    resolveLabel(option.label, option.value === currentValue)
                  )}
                </div>
              ))}
            </div>
          </Box>
        )}
      </div>
    </div>
  );
}
