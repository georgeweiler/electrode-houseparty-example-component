
const PARENT = {divisor: 2};
const CHILD = {divisor: 4, rotateBack: -1};
const SINGLE = {marginDivisor: 8};
const CONTAINER = {paddingDivisor: .13, marginDivisor: .13};


export default (type, size, rotateVal) => {

  const nodeSize = type === "child" ? (size / CHILD.divisor) : (size / PARENT.divisor);

  const parentOrSingle = {
    width: `${nodeSize}em`,
    height: `${nodeSize}em`,
    margin: `-${nodeSize / PARENT.divisor}em`,
    display: `block`,
    position: `absolute`,
    top: `50%`,
    left: `50%`,
    transform: `translate(0em)`
  };

  switch (type) {

  case "single": {
    const singleNode = {
      display: `inline-block`,
      position: `relative`,
      margin: `${nodeSize / SINGLE.marginDivisor}em`
    };
    ["width", "height"].map((prop) => singleNode[prop] = parentOrSingle[prop]);
    return singleNode;
  }

  case "child": {
    const childNode = {
      transform: `rotate(${rotateVal * 1}deg) translate(${nodeSize * PARENT.divisor}em) rotate(${rotateVal * CHILD.rotateBack}deg)`, // eslint-disable-line max-len
      backgroundSize: `100%`
    };
    return Object.assign(parentOrSingle, childNode);
  }

  case "container": {
    return {
      position: `relative`,
      width: `${size}em`,
      height: `${size}em`,
      padding: `${size * CONTAINER.paddingDivisor}em`,
      borderRadius: `50%`,
      display: `inline-block`,
      margin: `${size * CONTAINER.marginDivisor}em`,
      float: `right`
    };
  }

  default: {
    return parentOrSingle;
  }
  }
};
