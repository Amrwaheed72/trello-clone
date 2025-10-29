export const featuresVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
export const cardContainerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const cardChildVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

export const flagVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
export const footerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { when: 'beforeChildren' } },
};
export const childFooterVariantsLeft = {
  hidden: { x: '-50%', opacity: 0 },
  visible: { x: '0%', opacity: 1 },
};

export const childFooterVariantsRight = {
  hidden: { x: '5%', opacity: 0 },
  visible: { x: '0%', opacity: 1 },
};
