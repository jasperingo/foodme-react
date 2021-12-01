
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function FormTopTip({ text }) {
  const { t } = useTranslation();
  return (
    <div className="my-4 text-sm">{ t(text) }</div>
  )
}
