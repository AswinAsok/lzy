import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getNetlifyUserBuildInformation, getNetlifyUserInformation } from '../apis/netlify/netlify';
// import styles from '../styles/dashboard.module.css';
import UsageStats from '../components/UsageStats';

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  const { data: shaheenAccountID } = useQuery({
    initialData: null,
    queryKey: ['getShaheenUserInformation'],
    queryFn: () => getNetlifyUserInformation(import.meta.env.VITE_SHAHEEN_NETLIFY_ACCESS_TOKEN),
  });

  const { data: aswinAccountID } = useQuery({
    initialData: null,
    queryKey: ['getAswinUserInformation'],
    queryFn: () => getNetlifyUserInformation(import.meta.env.VITE_ASWIN_NETLIFY_ACCESS_TOKEN),
  });

  const { data: mmpAccountID } = useQuery({
    initialData: null,
    queryKey: ['getMmpUserInformation'],
    queryFn: () => getNetlifyUserInformation(import.meta.env.VITE_MMP_NETLIFY_ACCESS_TOKEN),
  });

  const {
    data: shaheenBuildInformation,
    refetch: refetchShaheenBuildInformation,
    isFetching: isShaheenFetching,
  } = useQuery({
    initialData: null,
    queryKey: ['getShaheenUserBuildInformation', shaheenAccountID],
    queryFn: () =>
      getNetlifyUserBuildInformation(
        shaheenAccountID,
        import.meta.env.VITE_SHAHEEN_NETLIFY_ACCESS_TOKEN,
      ),
    enabled: !!shaheenAccountID,
  });

  const {
    data: aswinBuildInformation,
    refetch: refetchAswinBuildInformation,
    isFetching: isAswinFetching,
  } = useQuery({
    initialData: null,
    queryKey: ['getAswinUserBuildInformation', aswinAccountID],
    queryFn: () =>
      getNetlifyUserBuildInformation(
        aswinAccountID,
        import.meta.env.VITE_ASWIN_NETLIFY_ACCESS_TOKEN,
      ),
    enabled: !!aswinAccountID,
  });

  const {
    data: mmpBuildInformation,
    refetch: refetchMmpBuildInformation,
    isFetching: isMmpFetching,
  } = useQuery({
    initialData: null,
    queryKey: ['getMmpUserBuildInformation', mmpAccountID],
    queryFn: () =>
      getNetlifyUserBuildInformation(mmpAccountID, import.meta.env.VITE_MMP_NETLIFY_ACCESS_TOKEN),
    enabled: !!mmpAccountID,
  });

  return (
    <>
      {shaheenBuildInformation && (
        <UsageStats
          usageData={shaheenBuildInformation}
          onRefresh={() => {
            refetchShaheenBuildInformation();
          }}
          isRefreshing={isShaheenFetching}
        />
      )}
      {aswinBuildInformation && (
        <UsageStats
          usageData={aswinBuildInformation}
          onRefresh={() => {
            refetchAswinBuildInformation();
          }}
          isRefreshing={isAswinFetching}
        />
      )}

      {mmpBuildInformation && (
        <UsageStats
          usageData={mmpBuildInformation}
          onRefresh={() => {
            refetchMmpBuildInformation();
          }}
          isRefreshing={isMmpFetching}
        />
      )}
    </>
  );
}
