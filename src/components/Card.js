import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

export default function Card({ title, weeks, color, description, href }) {
  const cardColorClass = `bg-${color}-600`; // e.g., bg-blue-600

  return (
    <div className={clsx("card-wrapper", cardColorClass)}>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-white text-opacity-80 mb-3">{weeks}</p>
        <p className="text-sm text-white text-opacity-90 leading-relaxed">{description}</p>
      </div>
      <div className="mt-6">
        <Link
          className={clsx("button button--outline button--md button--white")}
          to={href}>
          Open Module
        </Link>
      </div>
    </div>
  );
}
