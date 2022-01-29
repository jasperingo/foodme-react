
import React from 'react'
import { useTranslation } from 'react-i18next';

function DLItem({ title, body}) {

  const { t } = useTranslation();

  return (
    <div className="mb-2 border p-2 rounded">
      <dt className="text-color-primary">{ t(title) }</dt>
      <dd className="font-bold">{ body }</dd>
    </div>
  )
}

export default function ProfileDetailsText({ details = [] }) {

  return (
    <dl className="py-2 flex flex-wrap gap-2">
      {
        details.map((item, index)=> (
          <DLItem key={`profile-${index}`} title={item.title} body={item.body} />
        ))
      }
    </dl>
  );
}
