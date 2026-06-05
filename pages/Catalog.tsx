import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Star, X, FileText } from 'lucide-react';
import {
    pb,
    PRODUCTS,
    ProductRecord,
    ProductCategory,
    PRODUCT_CATEGORIES,
    CATEGORY_LABELS,
    fileUrl,
} from '../lib/pb';
import { useLanguage } from '../contexts/LanguageContext';

export const Catalog: React.FC = () => {
    const { language, t } = useLanguage();
    const [items, setItems] = useState<ProductRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<ProductCategory | 'all'>('all');
    const [selected, setSelected] = useState<ProductRecord | null>(null);

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const list = await pb.collection(PRODUCTS).getFullList<ProductRecord>({
                    filter: 'published = true',
                    sort: 'sort,-created',
                });
                if (active) setItems(list);
            } catch {
                /* leave empty on error */
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false; };
    }, []);

    const usedCategories = useMemo(
        () => PRODUCT_CATEGORIES.filter((c) => items.some((i) => i.category === c)),
        [items]
    );

    const visible = filter === 'all' ? items : items.filter((i) => i.category === filter);

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 pt-24 pb-20 px-4 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <span className="text-brand-500 font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block">
                        {t('Catalog', 'แคตตาล็อก')}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-stone-100">
                        {t('Our Products', 'สินค้าของเรา')}
                    </h1>
                </div>

                {!loading && items.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        <Chip active={filter === 'all'} onClick={() => setFilter('all')}>{t('All', 'ทั้งหมด')}</Chip>
                        {usedCategories.map((c) => (
                            <Chip key={c} active={filter === c} onClick={() => setFilter(c)}>
                                {language === 'TH' ? CATEGORY_LABELS[c].th : CATEGORY_LABELS[c].en}
                            </Chip>
                        ))}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 text-stone-400">
                        <Package className="w-10 h-10 mx-auto mb-4 opacity-40" />
                        <p>{t('No products yet. Please check back soon.', 'ยังไม่มีสินค้า โปรดกลับมาใหม่เร็วๆ นี้')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {visible.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setSelected(item)}
                                className="group text-left bg-white dark:bg-stone-950 rounded-2xl overflow-hidden border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="aspect-[4/3] bg-stone-100 dark:bg-stone-800 overflow-hidden relative">
                                    {item.images?.length ? (
                                        <img
                                            src={fileUrl(item, item.images[0], '600x0')}
                                            alt=""
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center"><Package className="w-8 h-8 text-stone-300" /></div>
                                    )}
                                    {item.featured && (
                                        <span className="absolute top-3 left-3 flex items-center gap-1 bg-amber-400 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                            <Star className="w-3 h-3 fill-white" /> {t('Featured', 'แนะนำ')}
                                        </span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500">
                                        {language === 'TH' ? CATEGORY_LABELS[item.category]?.th : CATEGORY_LABELS[item.category]?.en}
                                    </span>
                                    <h2 className="font-bold text-brand-900 dark:text-stone-100 leading-snug mt-1">
                                        {language === 'TH' ? item.name_th : item.name_en}
                                    </h2>
                                    {(item.spec_th || item.spec_en) && (
                                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                                            {language === 'TH' ? item.spec_th : item.spec_en}
                                        </p>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
        </div>
    );
};

const Chip: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            active
                ? 'bg-brand-500 text-white'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-brand-400'
        }`}
    >
        {children}
    </button>
);

const ProductModal: React.FC<{ product: ProductRecord; onClose: () => void }> = ({ product, onClose }) => {
    const { language, t } = useLanguage();
    const [active, setActive] = useState(0);
    const images = product.images || [];
    const description = language === 'TH' ? product.description_th : product.description_en;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start md:items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
            <div
                className="bg-white dark:bg-stone-950 rounded-2xl w-full max-w-3xl my-8 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500">
                        {language === 'TH' ? CATEGORY_LABELS[product.category]?.th : CATEGORY_LABELS[product.category]?.en}
                    </span>
                    <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"><X className="w-5 h-5" /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    <div>
                        <div className="aspect-square bg-stone-100 dark:bg-stone-800 rounded-xl overflow-hidden flex items-center justify-center">
                            {images.length ? (
                                <img src={fileUrl(product, images[active])} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <Package className="w-10 h-10 text-stone-300" />
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {images.map((img, i) => (
                                    <button
                                        key={img}
                                        onClick={() => setActive(i)}
                                        className={`w-14 h-14 rounded-lg overflow-hidden border-2 ${i === active ? 'border-brand-500' : 'border-transparent'}`}
                                    >
                                        <img src={fileUrl(product, img, '100x100')} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-brand-900 dark:text-stone-100">
                            {language === 'TH' ? product.name_th : product.name_en}
                        </h2>
                        {(product.spec_th || product.spec_en) && (
                            <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
                                {language === 'TH' ? product.spec_th : product.spec_en}
                            </p>
                        )}
                        {description && (
                            <div
                                className="prose prose-sm prose-stone dark:prose-invert max-w-none mt-4 text-stone-700 dark:text-stone-300"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        )}
                        <Link
                            to="/quote"
                            className="mt-6 inline-flex items-center gap-2 bg-brand-900 dark:bg-brand-500 text-white font-bold px-5 py-3 rounded-lg hover:bg-brand-800 dark:hover:bg-brand-600 transition-colors"
                        >
                            <FileText className="w-4 h-4" />
                            {t('Request a quote', 'ขอใบเสนอราคา')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
