import React from "react";
import { useState, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface TextAreaWithCounterProps {
  value: string;
  maxLength: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  optional?: boolean;
  errorMessage?: string;
}

const TextAreaWithCounter: React.FC<TextAreaWithCounterProps> = ({
  value,
  maxLength,
  onChange,
  className,
  placeholder,
  label,
  optional,
  errorMessage,
}) => {
  const [remainingChars, setRemainingChars] = useState(maxLength);

  useEffect(() => {
    setRemainingChars(maxLength - value.length);
  }, [value, maxLength]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= maxLength) {
      onChange(e);
    }
  };

  return (
    <>
      {label && (
        <Label>
          {label}
          {optional && (
            <span className="text-muted-foreground"> (opcional)</span>
          )}
        </Label>
      )}
      <Textarea
        value={value}
        onChange={handleChange}
        className={className}
        placeholder={placeholder}
      />
      <div className="flex flex-col gap-1">
        <span
          className={`text-xs ${
            remainingChars < maxLength * 0.1
              ? "text-destructive"
              : "text-muted-foreground"
          }`}
        >
          {remainingChars} caracteres restantes
        </span>
        {errorMessage && (
          <p className="text-destructive text-xs">{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default TextAreaWithCounter;
