import { JSX } from 'react';

import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { ServerError } from '@/components';
import { Locale } from '@/i18n/routing';
import { ResponseStatus } from '@/services/http-client/http-client-types';
import { MarketplaceService } from '@/services/marketplace-service/marketplace-service';

import { Item, NotFoundItem } from './_components';

type PageProps = {
  params: Promise<{ id: string; locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'itemPage' });

  const response = await MarketplaceService.getItem(id);

  let title = t('metadataNotFoundTitle');

  if (response.status === ResponseStatus.SUCCESS) {
    title = response.data.item.title;
  }

  return { title };
}

export default async function ItemPage({ params }: PageProps): Promise<JSX.Element> {
  const { id } = await params;

  if (!id) notFound();

  const response = await MarketplaceService.getItem(id);

  switch (response.status) {
    case ResponseStatus.SUCCESS:
      return <Item data={response.data} />;
    case ResponseStatus.NOT_FOUND:
      return <NotFoundItem />;
    default:
      return <ServerError />;
  }
}
