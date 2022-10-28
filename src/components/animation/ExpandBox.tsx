import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import IconButton from "./IconButton";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

const variants = {
  open: {
    opacity: 1,
    x: 0,
    height: "auto",
  },
  closed: {
    opacity: 0,
    x: "-20px",
    height: 0,
  },
};

const borderBoxVariants = {
  open: {
    opacity: 1,
    x: 0,
  },
  closed: {
    opacity: 0,
    x: "-20px",
  },
};

const ExpandBox: React.FC<{
  children: JSX.Element | Array<JSX.Element>;
  title: string;
}> = ({ children, title }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        variants={borderBoxVariants}
        initial="closed"
        animate="open"
        exit="closed"
        transition={{ duration: 0.4, type: "spring" }}
        className="mt-2 flex flex-col border rounded p-2 w-full"
      >
        <div className="flex flex-row w-full justify-between">
          <h1 className="">{title}</h1>
          {expanded ? (
            <IconButton
              icon={<MinusCircleIcon />}
              onClick={() => setExpanded(!expanded)}
            />
          ) : (
            <IconButton
              icon={<PlusCircleIcon />}
              onClick={() => setExpanded(!expanded)}
            />
          )}
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              variants={variants}
              style={{ overflow: "hidden" }}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.4, type: "spring" }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExpandBox;
