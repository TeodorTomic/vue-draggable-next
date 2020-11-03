import { ComponentStructure } from "./componentStructure";
import { isHtmlTag, isTransition } from "../util/tags";
import { resolveComponent } from "vue";

function getSlot(slots, key) {
  const slotValue = slots[key];
  return slotValue ? slotValue() : [];
}

function computeNodes(slots) {
  const [header, defaultNodes, footer] = [
    "header",
    "default",
    "footer"
  ].map(name => getSlot(slots, name));
  return {
    header,
    footer,
    default: defaultNodes
  };
}

function getRootInformation(tag) {
  const transition = isTransition(tag);
  const externalComponent = !isHtmlTag(tag) && !transition;
  return {
    transition,
    externalComponent,
    tag: externalComponent ? resolveComponent(tag) : tag
  };
}

function computeComponentStructure({ $slots, tag, $el }) {
  const nodes = computeNodes($slots);
  const root = getRootInformation(tag);
  return new ComponentStructure({ nodes, root, $el });
}

export { computeComponentStructure };
