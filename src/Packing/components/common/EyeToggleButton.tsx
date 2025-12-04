import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

interface Props {
  active: boolean;
  onToggle: () => void;
  size?: number;
}

export default function EyeToggleButton({ active, onToggle, size = 22 }: Props) {
  return (
    <button
      onClick={onToggle}
      className="p-1 rounded-lg transition shadow bg-transparent"
    >
      <div className="transition-opacity duration-200">
        {active ? (
          <VisibilityOffOutlinedIcon sx={{ fontSize: size }} />
        ) : (
          <RemoveRedEyeOutlinedIcon sx={{ fontSize: size }} />
        )}
      </div>
    </button>
  );
}
