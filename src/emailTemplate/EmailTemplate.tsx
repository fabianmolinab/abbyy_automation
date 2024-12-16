import React from 'react';

interface EmailTemplateProps {
  countLicense: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  countLicense,
}) => (
  <div>
    <h1>El numero de licencias son, {countLicense}</h1>
  </div>
);
