"use strict";
const SVGNS = "http://www.w3.org/2000/svg";

// const t = templateUnit.content.cloneNode(true);
// const a = document.createElement('div');
// a.append(t);


/**
 * @param  {...Element} args
 */
export function template(...args) {
  const template = document.createElement('template');
  template.content.append(...args);
  return template;
}

/**
 * @param {String} cssClass
 * @param  {...Element} args
 */
export function div(cssClass, ...args) {
  const element = document.createElement('div');
  element.classList.add(cssClass);
  element.append(...args);
  return element;
}



/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tagName
 * @returns {constructor<HTMLElementTagNameMap[K]>}
 */
export function buildHTML(tagName) {
  return constructor(document.createElement(tagName));
}

/**
 * @template {keyof SVGElementTagNameMap} K
 * @param {K} tagName
 * @returns {constructor<SVGElementTagNameMap[K]>}
 */
export function buildSVG(tagName) {
  return constructor(document.createElementNS(SVGNS, tagName));
}


/**
 * @template {HTMLElement | SVGElement} T
 * @typedef {Object} constructor
 * @property {(...tokens: string[]) => constructor<T>} setClassList
 * @property {(qualifiedName: string, value: string) => constructor<T>} setAttribute
 * @property {(property: string, value: string | null, priority?: string | undefined) => constructor<T>} setProperty
 * @property {() => T} get
 */

/**
 * @template {HTMLElement | SVGElement} T
 * @param {T} element
 * @returns {constructor<T>}
 */
function constructor(element) {
  return {
    setClassList: (...tokens) => {
      element.classList.add(...tokens);
      return constructor(element);
    },

    setAttribute: (qualifiedName, value) => {
      element.setAttribute(qualifiedName, value);
      return constructor(element);
    },

    setProperty: (property, valu, priority) => {
      element.style.setProperty(property, valu, priority);
      return constructor(element);
    },

    get: () => element
  }
}



// /**
//  * @template {keyof HTMLElementTagNameMap} K
//  * @param {K} tagName
//  * @returns {(cssClass: string, ...args: Element[]) => HTMLElementTagNameMap[K]}
//  */
// function createElementConstructor(tagName) {
//   return (cssClass, ...args) => {
//     const element = document.createElement(tagName);
//     element.classList.add(cssClass);
//     element.append(...args);
//     return element;
//   }
// }




// const tplPromise = fetch(new URL("./template.html", import.meta.url))
//   .then(r => r.text())
//   .then(text => {
//     const doc = new DOMParser().parseFromString(text, "text/html");
//     const template = doc.getElementById("template");
//     if (!template || !(template instanceof HTMLTemplateElement)) throw new Error(`not found`);
//     return document.importNode(template, true);
//   });

// export async function createPlayerButton(data) {
//   const tpl = await tplPromise;
//   const frag = tpl.content.cloneNode(true);

//   const button = document.createElement('div')
//   button.append(frag);

//   qs(button, ".name").textContent = data.name;

//   return button;
// }



/**
 * @param {ParentNode} root
 * @param {string} selector
 * @returns {Element}
 */
function qs(root, selector) {
  const el = root.querySelector(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}


/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {ParentNode} root
 * @param {K} tag
 * @returns {HTMLElementTagNameMap[K]}
 */
function qsTag(root, tag) {
  const el = root.querySelector(tag);
  if (!el) throw new Error(`Missing <${tag}>`);
  return el;
}

// qsTag(document, 'canvas').getContext


/**
 * @template {Element} T
 * @param {ParentNode} root
 * @param {new (...args: any[]) => T} ExpectedType
 * @param {string} className - 찾을 css 클래스 ('.' 없이)
 * @returns {T}
 */
function qsTyped(root, ExpectedType, className) {
  const el = root.querySelector(`.${className}`);

  if (!el) {
    throw new Error(`.${className} not found`);
  }

  if (!(el instanceof ExpectedType)) {
    throw new Error(`.${className} is not instance of ${ExpectedType.name}`);
  }

  return el;
}