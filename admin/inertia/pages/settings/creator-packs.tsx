import { Head } from '@inertiajs/react'
import SettingsLayout from '~/layouts/SettingsLayout'
import CreatorPacksSection from '~/components/CreatorPacksSection'
import ActiveDownloads from '~/components/ActiveDownloads'
import useCreatorPacks from '~/hooks/useCreatorPacks'
import { useTranslation } from 'react-i18next'

export default function CreatorPacksPage() {
  const { t } = useTranslation('settings')
  const { configured } = useCreatorPacks()

  return (
    <SettingsLayout>
      <Head title={t('creatorPacks.pageTitle')} />
      <div className="xl:pl-72 w-full">
        <main className="px-12 py-6">
          <h1 className="text-4xl font-semibold mb-2">{t('creatorPacks.title')}</h1>
          <p className="text-text-muted mb-4">
            {t('creatorPacks.description')}
          </p>

          {configured ? (
            <>
              <CreatorPacksSection allowUninstall />
              <div className="mt-10">
                <ActiveDownloads filetype="zim" withHeader />
              </div>
            </>
          ) : (
            <p className="text-text-muted mt-4">
              {t('creatorPacks.notAvailable')}
            </p>
          )}
        </main>
      </div>
    </SettingsLayout>
  )
}
