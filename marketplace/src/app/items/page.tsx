import { JSX } from 'react';

import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { ServerError } from '@/components';
import { ResponseStatus } from '@/services/http-client/http-client-types';
import { MarketplaceService } from '@/services/marketplace-service/marketplace-service';

import { Items, NotFoundItems } from './_components';

type PageProps = {
  searchParams: Promise<{ search: string }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { search } = await searchParams;

  const locale = await getLocale();

  const t = await getTranslations({ locale, namespace: 'itemsPage' });

  const searchDecoded = decodeURIComponent(search || t('metadataNotFoundTitle'));

  return {
    title: searchDecoded,
  };
}

export default async function ItemsPage({ searchParams }: PageProps): Promise<JSX.Element> {
  const { search } = await searchParams;

  if (!search) notFound();

  const searchDecoded = decodeURIComponent(search);

  const response = await MarketplaceService.listItems(searchDecoded);

  switch (response.status) {
    case ResponseStatus.SUCCESS:
      return <Items data={response.data} />;
    case ResponseStatus.NOT_FOUND:
      return <NotFoundItems />;
    default:
      return <ServerError />;
  }
}
