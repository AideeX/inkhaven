

export  function HeroSkeleton() {
    return (
      <div className="relative h-screen flex w-full mt-4">
        <section className="relative flex flex-col md:flex-row w-full h-full items-center justify-between px-4 md:px-8">
          <div className="z-10 flex flex-col justify-center h-full md:w-1/2 space-y-4 text-center md:text-left">
            <div className="h-10 bg-gray-300/75 animate-pulse rounded w-3/4 mx-auto md:mx-0">
            </div>
            <div className="h-10 bg-gray-300/75 animate-pulse rounded w-2/3 mx-auto md:mx-0">
            </div>
            <div className="h-6 bg-gray-300/75 animate-pulse rounded w-5/6 mx-auto md:mx-0">

            </div>
            <div className="pt-4 py-2 md:py-3 px-4 md:px-6">
              <div className="h-10 bg-gray-300/75 animate-pulse rounded w-1/3 mx-auto md:mx-0">

              </div>
            </div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row h-full md:w-1/2 items-center justify-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex flex-col space-y-4">
              <div className="w-[300px] h-[400px] bg-gray-300/75 animate-pulse rounded-lg shadow-lg hidden md:block">
              </div>
              <div className="w-[250px] h-[350px] bg-gray-300/75 animate-pulse rounded-lg shadow-lg hidden md:block">

              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="w-[300px] h-[400px] bg-gray-300/75 animate-pulse rounded-lg shadow-lg">
              </div>
              <div className="w-[300px] h-[500px] bg-gray-300/75 animate-pulse rounded-lg shadow-lg hidden md:block">
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  export function AboutSkeleton() {
    return (
      <section className="bg-gray-300/75 p-6 md:p-8 shadow-lg mt-8 rounded-lg mx-4 md:mx-0 animate-pulse">
        <div className="h-8 bg-gray-300/75 rounded w-1/2 mx-auto mb-4">
        </div>
        <div className="h-4 bg-gray-300/75 rounded w-5/6 mx-auto mb-2">
        </div>
        <div className="h-4 bg-gray-300/75 rounded w-4/5 mx-auto mb-2">
        </div>
        <div className="h-4 bg-gray-300/75 rounded w-3/4 mx-auto mb-4">
        </div>
        <div className="text-center md:text-right">
          <div className="h-6 bg-gray-300/75 rounded w-1/3 md:w-1/5 mx-auto md:mx-0">
          </div>
        </div>
      </section>
    );
  }

  export function FeaturesSkeleton() {
    return (
      <section className="bg-gray-300/75 py-12 md:py-16 animate-pulse">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="h-8 bg-gray-300/75 rounded w-1/3 mx-auto mb-8">
          </div>
          <div className="flex flex-col gap-8">
            
            <div className="flex flex-col md:flex-row items-center bg-gray-300/75 p-6 rounded-lg shadow-lg">
              <div className="md:w-1/2 mb-4 md:mb-0">
                <div className="w-[200px] h-[200px] bg-gray-300/75 rounded mx-auto md:mx-0">
                </div>
              </div>
              <div className="md:w-1/2 md:ml-8 text-center md:text-left">
                <div className="h-6 bg-gray-300/75 rounded w-1/2 mx-auto md:mx-0 mt-4 md:mt-0">
                </div>
                <div className="h-4 bg-gray-300/75 rounded w-5/6 mx-auto md:mx-0 mt-2">
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row-reverse items-center bg-gray-300/75 p-6 rounded-lg shadow-lg">
              <div className="md:w-1/2 mb-4 md:mb-0 md:ml-8"> 
                <div className="w-[200px] h-[200px] bg-gray-300/75 rounded mx-auto md:mx-0">
                </div>
              </div>
              <div className="md:w-1/2 text-center md:text-left">
                <div className="h-6 bg-gray-300/75 rounded w-1/2 mx-auto md:mx-0 mt-4 md:mt-0">
                </div>
                <div className="h-4 bg-gray-300/75 rounded w-5/6 mx-auto md:mx-0 mt-2 md:mr-8">
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center bg-gray-300/75 p-6 rounded-lg shadow-lg">
              <div className="md:w-1/2 mb-4 md:mb-0">
                <div className="w-[200px] h-[200px] bg-gray-300/75 rounded mx-auto md:mx-0">
                </div>
              </div>
              <div className="md:w-1/2 md:ml-8 text-center md:text-left">
                <div className="h-6 bg-gray-300/75 rounded w-1/2 mx-auto md:mx-0 mt-4 md:mt-0">
                </div>
                <div className="h-4 bg-gray-300/75 rounded w-5/6 mx-auto md:mx-0 mt-2">
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row-reverse items-center bg-gray-300/75 p-6 rounded-lg shadow-lg">
              <div className="md:w-1/2 mb-4 md:mb-0 md:ml-8"> 
                <div className="w-[200px] h-[200px] bg-gray-300/75 rounded mx-auto md:mx-0">
                </div>
              </div>
              <div className="md:w-1/2 text-center md:text-left">
                <div className="h-6 bg-gray-300/75 rounded w-1/2 mx-auto md:mx-0 mt-4 md:mt-0">
                </div>
                <div className="h-4 bg-gray-300/75 rounded w-5/6 mx-auto md:mx-0 mt-2 md:mr-8">
                </div>
              </div>
            </div>
  
          </div>
        </div>
      </section>
    );
  }

export function LandingPageSkeleton() {
    return (
        <div>
                <HeroSkeleton />
                <div className="mt-8">
                <AboutSkeleton />
                </div>
                <div className="mt-16">
                <FeaturesSkeleton />
                </div>
           </div>
    );
}

export function TagSelectionSkeleton() {
    return (
      <div className="p-6 bg-gray-300/75 rounded-xl shadow-3xl max-w-lg w-full mx-auto mt-10 sm:mt-20 animate-pulse">
        <div className="h-8 bg-gray-300/75 rounded w-2/3 mx-auto mb-6">
        </div>
        <div className="flex justify-end mb-4">
          <div className="h-4 bg-gray-300/75 rounded w-1/4">
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="h-8 bg-gray-300/75 rounded"></div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <div className="h-10 bg-gray-300/75 rounded w-1/3">
          </div>
        </div>
      </div>
    );
  }

  export function SearchSkeleton() {
    return (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-dark-secondaryBg mt-2 p-2 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50 animate-pulse">
            {Array.from({ length: 5 }).map((_, index) => (
                <div 
                    key={index} 
                    className="block px-4 py-2 bg-gray-300/75 dark:bg-dark-secondaryBg rounded mb-2">
                </div>
            ))}
        </div>
    );
}

export function NotificationSkeleton() {
    return (
        <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
                <div 
                    key={index} 
                    className="h-6 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-full animate-pulse">
                </div>
            ))}
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="p-6 bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="p-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded-lg shadow-lg text-center">
                        <div className="h-6 bg-gray-300/75 rounded w-3/4 mx-auto mb-4"></div>
                        <div className="h-8 bg-gray-300/75 rounded w-1/2 mx-auto"></div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-gray-300/75 dark:bg-dark-secondaryBg rounded-lg shadow-lg">
                <div className="h-6 bg-gray-300/75 rounded w-1/3 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="relative w-full h-48 bg-gray-300/75 dark:bg-dark-accentLight rounded-lg mb-2"></div>
                            <div className="h-4 bg-gray-300/75 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function HomeSkeleton() {
  return (
      <div className="bg-light-primary dark:bg-dark-primary h-full">
          <div className="container mx-auto flex flex-col md:flex-row mt-8 p-4 space-x-4">
              <div className="w-full md:w-2/3">
                  <MainContentSkeleton />
              </div>
              <div className="w-full md:w-1/3 space-y-8">
                  <FeaturedPostsSkeleton />
                  <CommunityMembersSkeleton />
              </div>
          </div>
      </div>
  );
}

export function ProfileSkeleton() {
    return (
        <div className="container mx-auto mt-8 p-4 bg-light-secondaryBg dark:bg-dark-secondaryBg rounded-xl shadow-3xl animate-pulse">
            <div className="flex items-center space-x-4">
                <div className="rounded-full bg-gray-300/75 dark:bg-dark-secondaryBg h-20 w-20"></div>
                <div>
                    <div className="h-6 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-40 mb-2"></div>
                    <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-64 mb-2"></div>
                    <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-32"></div>
                </div>
            </div>

            <div className="mt-4 flex space-x-6">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index}>
                        <div className="h-6 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-12 mb-1"></div>
                        <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-20"></div>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <div className="h-6 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-40 mb-4"></div>
                <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-full"></div>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <div className="h-6 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-40 mb-4"></div>
                <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-full"></div>
                    ))}
                </div>
            </div>

            <div className="mt-8 space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index}>
                        <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-1/2 mb-2"></div>
                        <div className="h-10 bg-gray-300/75 dark:bg-dark-secondaryBg rounded"></div>
                    </div>
                ))}
                <div className="h-10 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-32 mt-4"></div>
            </div>
        </div>
    );
}

export function MainContentSkeleton() {
    return (
        <div className="container flex flex-col mx-auto mt-8 p-4 bg-light-primary dark:bg-dark-primary rounded-lg shadow-lg animate-pulse">
            <div className="flex space-x-4 mb-4">
                <div className="h-8 w-24 bg-gray-300/75 dark:bg-dark-secondaryBg rounded-lg"></div>
                <div className="h-8 w-24 bg-gray-300/75 dark:bg-dark-secondaryBg rounded-lg"></div>
                <div className="h-8 w-24 bg-gray-300/75 dark:bg-dark-secondaryBg rounded-lg"></div>
            </div>

            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="h-40 bg-gray-300/75 dark:bg-dark-secondaryBg rounded-lg"></div>
                ))}
            </div>
        </div>
    );
}

export function FeaturedPostsSkeleton() {
  return (
      <div className="bg-light-secondaryBg dark:bg-dark-secondaryBg p-4 rounded-lg shadow-md animate-pulse">
          <div className="h-6 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center p-2 rounded-md">
                      <div className="w-16 h-16 bg-gray-300/75 dark:bg-dark-secondaryBg rounded-md"></div>
                      <div className="ml-4 flex-1">
                          <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-1/2"></div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
}

export function CommunityMembersSkeleton() {
  return (
      <div className="bg-light-secondaryBg dark:bg-dark-secondaryBg p-4 rounded-lg shadow-md mt-8 animate-pulse">
          <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-1/3"></div>
              <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-16"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4 p-2 rounded cursor-pointer">
                      <div className="w-12 h-12 bg-gray-300/75 dark:bg-dark-secondaryBg rounded-full"></div>
                      <div className="flex-1">
                          <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-3/4"></div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
}

export function AllMembersSkeleton() {
    return (
        <div className="bg-light-primary dark:bg-dark-primary p-4 rounded-lg shadow-md mt-8 w-3/4 mx-auto animate-pulse">
            <div className="flex justify-center items-center mb-4">
                <div className="h-6 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-1/3"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-light-secondaryBg dark:bg-dark-secondaryBg p-6 rounded-lg shadow w-full max-w-sm mx-auto min-h-[160px] flex flex-col items-center justify-center"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-gray-300/75 dark:bg-dark-secondaryBg rounded-full"></div>
                            <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-3/4"></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <div className="h-10 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-32"></div>
            </div>
        </div>
    );
}



export function SinglePostSkeleton() {
    return (
        <div className="shadow bg-gradient-to-r from-light-secondaryBg to-light-primary dark:from-dark-secondaryBg dark:to-dark-primary p-4 sm:p-6 md:p-8 min-h-screen w-full sm:w-11/12 md:w-2/3 lg:w-3/4 mx-auto rounded-xl animate-pulse">
            <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-300/75 dark:bg-dark-secondaryBg rounded-lg mb-4 sm:mb-6 md:mb-8"></div>
            <div className="h-10 sm:h-12 md:h-16 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-3/4 mx-auto mb-4 sm:mb-6 md:mb-8"></div>
            <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-4 sm:h-5 md:h-6 bg-gray-300/75 dark:bg-dark-secondaryBg rounded"></div>
                ))}
            </div>
        </div>
    );
}

export function MobileFeaturedSkeleton() {
  return (
      <div className="bg-light-secondaryBg dark:bg-dark-secondaryBg p-4 rounded-lg shadow-md mt-4 md:mt-0 animate-pulse">
          <div className="h-6 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-1/3 mx-auto mb-4"></div>
          <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, index) => (
                  <div 
                      key={index} 
                      className="flex items-center p-2 rounded-lg cursor-pointer transition-colors bg-gray-300/75 dark:bg-dark-secondaryBg"
                  >
                      <div className="w-12 h-12 bg-gray-300/75 dark:bg-dark-secondaryBg rounded-lg"></div>
                      <div className="ml-4 flex-1">
                          <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-1/2"></div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
}

export function CommentListSkeleton() {
    return (
        <div className="shadow bg-light-secondaryBg dark:bg-dark-secondaryBg p-4 mt-8 md:mx-4 sm:p-6 md:p-8 min-h-screen w-full sm:w-11/12 md:w-2/3 lg:w-3/4 mx-auto rounded-xl animate-pulse">
            <div className="mb-4">
                <div className="h-10 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-full mb-2"></div>
                <div className="h-8 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-1/2"></div>
            </div>
            <ul className="space-y-4 mt-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <li key={index} className="flex space-x-4">
                        <div className="w-10 h-10 bg-gray-300/75 dark:bg-dark-secondaryBg rounded-full"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-1/3 mb-2"></div>
                            <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-5/6"></div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-6 text-center">
                <div className="h-10 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-32 mx-auto"></div>
            </div>
        </div>
    );
}



export function UserPostCardSkeleton() {
    return (
        <div className="p-4 bg-light-secondaryBg dark:bg-dark-secondaryBg border border-light-accentLight dark:border-dark-accentLight rounded-lg shadow-md transition-shadow h-auto w-full flex items-center relative mb-4 sm:w-full sm:h-auto animate-pulse">
   
            <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-gray-300/75 dark:bg-dark-secondaryBg rounded-lg"></div>
            </div>
            <div className="flex flex-col justify-center flex-grow ml-4 min-w-0">
                <div>
                    <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-5/6"></div>
                </div>
                <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-12"></div>
                    ))}
                </div>
                <div className="flex justify-end mt-auto space-x-2">
                    <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-16"></div>
                    <div className="h-4 bg-gray-300/75 dark:bg-dark-secondaryBg rounded w-16"></div>
                </div>
            </div>
        </div>
    );
}

