import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Newspaper } from 'lucide-react';
import { pb, NEWS, NewsRecord, fileUrl, pbErrorMessage } from '../lib/pb';
import { useLanguage } from '../contexts/LanguageContext';

const formatDate = (value: string, locale: string) => {
    const d = new Date(value);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
};

export const News: React.FC = () => {
    const { id } = useParams();
    return id ? <NewsDetail id={id} /> : <NewsList />;
};

const NewsList: React.FC = () => {
    const { language, t } = useLanguage();
    const [items, setItems] = useState<NewsRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const locale = language === 'TH' ? 'th-TH' : 'en-US';

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const list = await pb.collection(NEWS).getFullList<NewsRecord>({
                    filter: 'published = true',
                    sort: '-publish_date,-created',
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

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 pt-24 pb-20 px-4 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <span className="text-brand-500 font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block">
                        {t('News', 'ข่าวสาร')}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-stone-100">
                        {t('News & Promotions', 'ข่าวสารและโปรโมชั่น')}
                    </h1>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 text-stone-400">
                        <Newspaper className="w-10 h-10 mx-auto mb-4 opacity-40" />
                        <p>{t('No news yet. Please check back soon.', 'ยังไม่มีข่าวสาร โปรดกลับมาใหม่เร็วๆ นี้')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <Link
                                key={item.id}
                                to={`/news/${item.id}`}
                                className="group bg-white dark:bg-stone-950 rounded-2xl overflow-hidden border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="aspect-[16/10] bg-stone-100 dark:bg-stone-800 overflow-hidden">
                                    {item.cover && (
                                        <img
                                            src={fileUrl(item, item.cover, '600x0')}
                                            alt=""
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    )}
                                </div>
                                <div className="p-6">
                                    {(item.publish_date || item.created) && (
                                        <p className="flex items-center gap-1.5 text-xs text-stone-400 mb-2">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(item.publish_date || item.created, locale)}
                                        </p>
                                    )}
                                    <h2 className="font-bold text-lg text-brand-900 dark:text-stone-100 leading-snug group-hover:text-brand-500 transition-colors">
                                        {language === 'TH' ? item.title_th : item.title_en}
                                    </h2>
                                    <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 line-clamp-3">
                                        {language === 'TH' ? item.excerpt_th : item.excerpt_en}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const NewsDetail: React.FC<{ id: string }> = ({ id }) => {
    const { language, t } = useLanguage();
    const [item, setItem] = useState<NewsRecord | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const locale = language === 'TH' ? 'th-TH' : 'en-US';

    useEffect(() => {
        let active = true;
        setLoading(true);
        (async () => {
            try {
                const rec = await pb.collection(NEWS).getOne<NewsRecord>(id);
                if (active) setItem(rec);
            } catch (err) {
                if (active) setError(pbErrorMessage(err, t('Post not found.', 'ไม่พบโพสต์')));
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false; };
    }, [id, t]);

    const body = item ? (language === 'TH' ? item.body_th : item.body_en) : '';

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 pt-24 pb-20 px-4 transition-colors duration-300">
            <div className="max-w-3xl mx-auto">
                <Link to="/news" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-brand-500 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    {t('Back to News', 'กลับไปหน้าข่าวสาร')}
                </Link>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : error || !item ? (
                    <p className="text-center py-20 text-stone-400">{error || t('Post not found.', 'ไม่พบโพสต์')}</p>
                ) : (
                    <article>
                        {(item.publish_date || item.created) && (
                            <p className="flex items-center gap-1.5 text-xs text-stone-400 mb-3">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(item.publish_date || item.created, locale)}
                            </p>
                        )}
                        <h1 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-stone-100 leading-tight mb-6">
                            {language === 'TH' ? item.title_th : item.title_en}
                        </h1>
                        {item.cover && (
                            <img src={fileUrl(item, item.cover)} alt="" className="w-full rounded-2xl mb-8" />
                        )}
                        {body ? (
                            <div
                                className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 leading-relaxed [&_img]:rounded-xl [&_a]:text-brand-500"
                                dangerouslySetInnerHTML={{ __html: body }}
                            />
                        ) : (
                            <p className="text-stone-600 dark:text-stone-400">
                                {language === 'TH' ? item.excerpt_th : item.excerpt_en}
                            </p>
                        )}
                    </article>
                )}
            </div>
        </div>
    );
};
