type Card = {
    title: string;
    description: string;
    buttonText: string | string[];
    Icon: React.ElementType;
    details: string;
    redirectUrlFirst?: string;
    redirectUrlSecond?: string;
  };