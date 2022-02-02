import { useTranslation } from "react-i18next";

export default function AlertDialogButton({ btn }) {

  const { t } = useTranslation();

  return (
    <button 
      onClick={btn.action}
      className={`flex-grow py-2 border-t hover:bg-color-gray-h ${btn.color}`}
      >
      { t(btn.text) }
    </button>
  );
}