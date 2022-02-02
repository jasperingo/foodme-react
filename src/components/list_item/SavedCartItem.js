
import Icon from "@mdi/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { copyIcon } from "../../assets/icons";
import { useCopyText } from "../../hooks/viewHook";

export default function SavedCartItem({ cart: { id, code, title } }) {

  const { t } = useTranslation();

  const [copied, setCopied] = useState(false);

  const copy = useCopyText();

  function copyCode() {

    copy(code);

    setCopied(true);

    setTimeout(()=> setCopied(false), 2000);
  
  }
  
  return (
    <li>
      <div className="flex mb-4 py-2 rounded md:shadow md:px-2">
        <Link to={`/saved-cart/${id}`} className="flex-grow py-2 hover:bg-color-gray-h">
          <div className="text-lg font-bold mb-1 text-color-primary">{ code }</div>
          <div className="flex-grow">{ title }</div>
        </Link>
        <button onClick={copyCode} className="p-1 text-center hover:bg-color-gray-h">
          <Icon path={copyIcon} className="w-5 h-5 inline-block" />
          <span className="sr-only">{ t('_cart.Copy_code') }</span>
          <span className={`${!copied && 'hidden'} text-green-500`}>{ t('_extra.Copied') }</span>

        </button>
      </div>
    </li>
  );
}
