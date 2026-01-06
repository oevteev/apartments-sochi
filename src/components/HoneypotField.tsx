import { Input } from "@/components/ui/input";

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
  fieldName: string;
}

/**
 * Invisible honeypot field to catch spam bots.
 * Bots will fill this field, humans won't see it.
 */
const HoneypotField = ({ value, onChange, fieldName }: HoneypotFieldProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        opacity: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
      aria-hidden="true"
      tabIndex={-1}
    >
      <label htmlFor={fieldName}>
        Оставьте это поле пустым
        <Input
          type="text"
          id={fieldName}
          name={fieldName}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </label>
    </div>
  );
};

export default HoneypotField;
