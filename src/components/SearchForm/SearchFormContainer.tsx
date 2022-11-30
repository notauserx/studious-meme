import { FormEvent, ReactNode } from "react";

type SeachFormContainerProps = {
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

const SeachFormContainer: React.FC<SeachFormContainerProps> = ({
  onSearchSubmit,
  children,
}) => (
  <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-xl">
    <div className="max-w-md mx-auto space-y-6">
      <form onSubmit={onSearchSubmit}>{children}</form>
    </div>
  </div>
);

export default SeachFormContainer;