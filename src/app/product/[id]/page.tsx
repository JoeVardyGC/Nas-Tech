import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';
import ProductDetailPage from '@/components/ProductDetailPage';

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) {
    return {
      title: 'Product Not Found | Nas Tech',
    };
  }

  return {
    title: `${product.name} | Nas Tech Ghana (Kumasi)`,
    description: `${product.description} Available now at Nas Tech Kumasi showroom in Adum. GH₵ ${product.priceGHS}.`,
    openGraph: {
      title: `${product.name} | Nas Tech Ghana`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default function Page({ params }: PageProps) {
  const product = PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
