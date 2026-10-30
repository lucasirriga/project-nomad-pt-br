import {
  IconAdjustments,
  IconArrowBigUpLines,
  IconBox,
  IconChartBar,
  IconCode,
  IconDashboard,
  IconFolder,
  IconGavel,
  IconHeart,
  IconMapRoute,
  IconMovie,
  IconSettings,
  IconWand,
  IconZoom
} from '@tabler/icons-react'
import { usePage } from '@inertiajs/react'
import StyledSidebar from '~/components/StyledSidebar'
import { getServiceLink } from '~/lib/navigation'
import useServiceInstalledStatus from '~/hooks/useServiceInstalledStatus'
import useCreatorPacks from '~/hooks/useCreatorPacks'
import { SERVICE_NAMES } from '../../constants/service_names'
import { useTranslation } from 'react-i18next'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation('layout')
  const { aiAssistantName } = usePage<{ aiAssistantName: string }>().props
  const aiAssistantInstallStatus = useServiceInstalledStatus(SERVICE_NAMES.OLLAMA)
  // Only show the Creator Packs entry on builds that can actually install packs
  // (release-injected key present) — a fork built from source has no key.
  const { configured: creatorPacksConfigured } = useCreatorPacks()

  const navigation = [
    ...(aiAssistantInstallStatus.isInstalled ? [{ name: aiAssistantName, href: '/settings/models', icon: IconWand, current: false }] : []),
    { name: t('sidebar.nav.supplyDepot'), href: '/supply-depot', icon: IconBox, current: false },
    { name: t('sidebar.nav.benchmark'), href: '/settings/benchmark', icon: IconChartBar, current: false },
    { name: t('sidebar.nav.contentExplorer'), href: '/settings/zim/remote-explorer', icon: IconZoom, current: false },
    { name: t('sidebar.nav.contentManager'), href: '/settings/zim', icon: IconFolder, current: false },
    ...(creatorPacksConfigured ? [{ name: t('sidebar.nav.creatorPacks'), href: '/settings/creator-packs', icon: IconMovie, current: false }] : []),
    { name: t('sidebar.nav.mapsManager'), href: '/settings/maps', icon: IconMapRoute, current: false },
    {
      name: t('sidebar.nav.serviceLogsMetrics'),
      href: getServiceLink('9999'),
      icon: IconDashboard,
      current: false,
      target: '_blank',
    },
    {
      name: t('sidebar.nav.checkForUpdates'),
      href: '/settings/update',
      icon: IconArrowBigUpLines,
      current: false,
    },
    { name: t('sidebar.nav.system'), href: '/settings/system', icon: IconSettings, current: false },
    { name: t('sidebar.nav.advanced'), href: '/settings/advanced', icon: IconAdjustments, current: false },
    { name: t('sidebar.nav.apiReference'), href: '/reference', icon: IconCode, current: false },
    { name: t('sidebar.nav.supportProject'), href: '/settings/support', icon: IconHeart, current: false },
    { name: t('sidebar.nav.legalNotices'), href: '/settings/legal', icon: IconGavel, current: false },
  ]

  return (
    <div className="min-h-screen flex flex-row bg-surface-secondary/90">
      <StyledSidebar title={t('sidebar.settingsTitle')} items={navigation} />
      {children}
    </div>
  )
}
