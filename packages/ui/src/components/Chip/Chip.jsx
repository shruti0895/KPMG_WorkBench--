import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Chip.css';

/* ==========================================================================
   EXPORTED SVG ICONS FOR CHIP COMPONENT
   ========================================================================== */

/**
 * Checkmark SVG icon (16x16)
 */
export const ChipCheckmarkSvg = ({
  size = 16,
  fill = 'currentColor',
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path
      d="M13.8639 3.65609C14.0533 3.85704 14.0439 4.17348 13.8429 4.36288L5.91309 11.8368C5.67573 12.0605 5.30311 12.0536 5.07417 11.8213L2.39384 9.10093C2.20003 8.90422 2.20237 8.58765 2.39907 8.39384C2.59578 8.20003 2.91235 8.20237 3.10616 8.39907L5.51192 10.8407L13.1571 3.63516C13.358 3.44577 13.6745 3.45513 13.8639 3.65609Z"
      fill={fill}
    />
  </svg>
);

ChipCheckmarkSvg.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Dismiss / Close ('X') SVG icon (16x16)
 */
export const ChipDismissSvg = ({
  size = 16,
  fill = 'currentColor',
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path
      d="M2.58859 2.71569L2.64645 2.64645C2.82001 2.47288 3.08944 2.4536 3.28431 2.58859L3.35355 2.64645L8 7.293L12.6464 2.64645C12.8417 2.45118 13.1583 2.45118 13.3536 2.64645C13.5488 2.84171 13.5488 3.15829 13.3536 3.35355L8.707 8L13.3536 12.6464C13.5271 12.82 13.5464 13.0894 13.4114 13.2843L13.3536 13.3536C13.18 13.5271 12.9106 13.5464 12.7157 13.4114L12.6464 13.3536L8 8.707L3.35355 13.3536C3.15829 13.5488 2.84171 13.5488 2.64645 13.3536C2.45118 13.1583 2.45118 12.8417 2.64645 12.6464L7.293 8L2.64645 3.35355C2.47288 3.17999 2.4536 2.91056 2.58859 2.71569L2.64645 2.64645L2.58859 2.71569Z"
      fill={fill}
    />
  </svg>
);

ChipDismissSvg.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Branded Document / App SVG icon (16x16)
 */
export const ChipBrandedDocSvg = ({
  size = 20,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={className}
    {...props}
  >
    <g
      style={{
        mixBlendMode: "multiply",
      }}
      opacity={0.2}
    >
      <rect
        x={4.70701}
        y={2.59375}
        width={9.79281}
        height={11.4087}
        fill="url(#pattern0_63721_144147)"
      />
      <g
        opacity={0.2}
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M13.4493 2.65625H5.68522C5.41543 2.65625 5.19672 2.87686 5.19672 3.14901V12.6157C5.19672 12.8878 5.41543 13.1085 5.68522 13.1085H13.4493C13.7191 13.1085 13.9378 12.8878 13.9378 12.6157V3.14901C13.9378 2.87686 13.7191 2.65625 13.4493 2.65625Z"
          fill="white"
        />
      </g>
    </g>
    <g
      style={{
        mixBlendMode: "multiply",
      }}
      opacity={0.12}
    >
      <rect
        x={4.9364}
        y={2.54688}
        width={9.2411}
        height={10.8522}
        fill="url(#pattern1_63721_144147)"
      />
      <g
        opacity={0.12}
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M13.4475 2.65625H5.68335C5.41356 2.65625 5.19486 2.87686 5.19486 3.14901V12.6157C5.19486 12.8878 5.41356 13.1085 5.68335 13.1085H13.4475C13.7173 13.1085 13.936 12.8878 13.936 12.6157V3.14901C13.936 2.87686 13.7173 2.65625 13.4475 2.65625Z"
          fill="white"
        />
      </g>
    </g>
    <path
      d="M5.67844 13.0951H13.4483C13.5122 13.0959 13.5756 13.0838 13.6348 13.0597C13.6941 13.0356 13.748 12.9998 13.7934 12.9545C13.8388 12.9092 13.8749 12.8553 13.8995 12.7958C13.9241 12.7364 13.9368 12.6726 13.9368 12.6081V10.4922H5.19569V12.6139C5.19569 12.6776 5.20822 12.7407 5.23255 12.7994C5.25688 12.8582 5.29252 12.9115 5.33743 12.9562C5.38233 13.001 5.4356 13.0363 5.49413 13.0601C5.55267 13.084 5.61532 13.0959 5.67844 13.0951Z"
      fill="#103F91"
    />
    <path
      d="M13.4484 2.6603H5.67847C5.61486 2.65952 5.55174 2.67158 5.49283 2.69578C5.43391 2.71998 5.38038 2.75582 5.3354 2.80119C5.29042 2.84656 5.25489 2.90055 5.2309 2.95999C5.20692 3.01942 5.19496 3.08309 5.19573 3.14725V5.269H13.9368V3.14146C13.9369 3.07728 13.9242 3.01375 13.8995 2.95461C13.8748 2.89546 13.8386 2.84189 13.7931 2.79706C13.7476 2.75222 13.6936 2.71703 13.6344 2.69354C13.5752 2.67005 13.512 2.65875 13.4484 2.6603Z"
      fill="#41A5EE"
    />
    <path
      d="M13.9368 7.87891H5.19569V10.4934H13.9368V7.87891Z"
      fill="#185ABD"
    />
    <path
      d="M13.9368 5.26562H5.19569V7.88013H13.9368V5.26562Z"
      fill="#2B7CD3"
    />
    <g
      style={{
        mixBlendMode: "multiply",
      }}
      opacity={0.48}
    >
      <rect
        x={1.50018}
        y={4.22656}
        width={8.13768}
        height={8.20872}
        fill="url(#pattern2_63721_144147)"
      />
      <g
        opacity={0.48}
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M7.94277 4.94141H3.09234C2.82255 4.94141 2.60385 5.16202 2.60385 5.43416V10.3269C2.60385 10.5991 2.82255 10.8197 3.09234 10.8197H7.94277C8.21255 10.8197 8.43126 10.5991 8.43126 10.3269V5.43416C8.43126 5.16202 8.21255 4.94141 7.94277 4.94141Z"
          fill="white"
        />
      </g>
    </g>
    <g
      style={{
        mixBlendMode: "multiply",
      }}
      opacity={0.24}
    >
      <rect
        x={2.45512}
        y={4.77344}
        width={6.20671}
        height={6.26089}
        fill="url(#pattern3_63721_144147)"
      />
      <g
        opacity={0.24}
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M7.94263 4.94141H3.0922C2.82241 4.94141 2.60371 5.16202 2.60371 5.43416V10.3269C2.60371 10.5991 2.82241 10.8197 3.0922 10.8197H7.94263C8.21241 10.8197 8.43112 10.5991 8.43112 10.3269V5.43416C8.43112 5.16202 8.21241 4.94141 7.94263 4.94141Z"
          fill="white"
        />
      </g>
    </g>
    <path
      d="M7.94277 4.9375H3.09234C2.82255 4.9375 2.60385 5.15811 2.60385 5.43025V10.323C2.60385 10.5952 2.82255 10.8158 3.09234 10.8158H7.94277C8.21255 10.8158 8.43126 10.5952 8.43126 10.323V5.43025C8.43126 5.15811 8.21255 4.9375 7.94277 4.9375Z"
      fill="#185ABD"
    />
    <g
      style={{
        mixBlendMode: "soft-light",
      }}
      opacity={0.5}
    >
      <path
        opacity={0.5}
        d="M7.94277 4.9375H3.09234C2.82255 4.9375 2.60385 5.15811 2.60385 5.43025V10.323C2.60385 10.5952 2.82255 10.8158 3.09234 10.8158H7.94277C8.21255 10.8158 8.43126 10.5952 8.43126 10.323V5.43025C8.43126 5.15811 8.21255 4.9375 7.94277 4.9375Z"
        fill="url(#paint0_linear_63721_144147)"
        style={{
          mixBlendMode: "soft-light",
        }}
      />
    </g>
    <path
      d="M4.59781 8.69462C4.59781 8.76998 4.59781 8.83375 4.59781 8.89172C4.59781 8.83955 4.59781 8.77578 4.59781 8.70041C4.60609 8.63566 4.61954 8.57168 4.63804 8.50911L5.14377 6.28302H5.80467L6.38511 8.45694C6.41848 8.59216 6.44154 8.72976 6.45408 8.86853C6.45408 8.75259 6.48281 8.61926 6.51155 8.46853L6.93107 6.26562H7.53451L6.79315 9.45404H6.09777L5.59203 7.34389C5.59203 7.28012 5.5633 7.20476 5.54606 7.10621C5.52882 7.00766 5.51732 6.93809 5.51158 6.89171C5.51158 6.94389 5.51158 7.01925 5.4771 7.1236C5.44261 7.22795 5.44836 7.29751 5.43687 7.34969L4.98286 9.47143H4.2415L3.4944 6.28302H4.10357L4.56333 8.51491C4.5781 8.57412 4.58961 8.63412 4.59781 8.69462Z"
      fill="white"
    />
    <defs>
      <pattern
        id="pattern0_63721_144147"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use
          xlinkHref="#image0_63721_144147"
          transform="scale(0.0138889 0.0120482)"
        />
      </pattern>
      <pattern
        id="pattern1_63721_144147"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use
          xlinkHref="#image1_63721_144147"
          transform="scale(0.0147059 0.0126582)"
        />
      </pattern>
      <pattern
        id="pattern2_63721_144147"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#image2_63721_144147" transform="scale(0.0166667)" />
      </pattern>
      <pattern
        id="pattern3_63721_144147"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#image3_63721_144147" transform="scale(0.0217391)" />
      </pattern>
      <linearGradient
        id="paint0_linear_63721_144147"
        x1={3.61531}
        y1={4.55489}
        x2={7.46959}
        y2={11.1694}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity={0.5} />
        <stop offset={1} stopOpacity={0.7} />
      </linearGradient>
      <image
        id="image0_63721_144147"
        width={72}
        height={83}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABTCAYAAAA8/EEfAAAACXBIWXMAAC4jAAAuIwF4pT92AAAB4ElEQVR4Xu3cwWrUUABG4XPbUMGNCnYhOM/hpjtfXRDtYziioFRcNqZeF/dmJh3aHnCZ/GeTdiab+5HJ8i+1VpaVUgobrJ5C9Mr8eYcZgAvgHNgKVAXugBGYTqFKrXXGeQZcAm+BF2wDacb5DeyBH8DtEmlYXC+Bd8AVsKM9SVtoBL4AH4BPwHfgz/zl0J+eC9qTcwW8B95wxFt7E/Ct//0VuCmlHH5qM8I57We1o+G8BM7YRn/7dcfx1XJoBlq+oAcaztrfP3Nn3D/7vXNv5Sn57wIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQFKApABJAZICJAVICpA0A1XaXN7Yrw/Odq60J88+r+At1yh/As9py5xrX8KrwC3tzHuawd3yhqHWWkspY7/hI/Cqf/ea9Y9NTjScz7Sz74HxoanSibZjet3//0Vb5lz7XOnywbimGUzLG07XgLc0eKtDt7AAgk1OJj85lQwnQIcPNza6/djYNjwClI79A/7Gf1JmIOGZAAAAAElFTkSuQmCC"
      />
      <image
        id="image1_63721_144147"
        width={68}
        height={79}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABPCAYAAABS1GNxAAAACXBIWXMAAC4jAAAuIwF4pT92AAABY0lEQVR4Xu3cvW3bYAAG4aNggEuo8xLp0nmhdB7AnQdy5zITuIo6DSFWXwqK/jkkQWrxHoCFBEoAD59UvtMYg3y4+/ximqYZOALzn2+/SQtwHmMsANN2Qq4xvgGPrFH24gw8AT/HGAtjDK5R7oEX4AKMHV0X4BX4DsxbjBl4AH79xxfc4nVhPQz3B1ZH4Af7+ql89v7fefAbf/3IThzIFwWRgkhBpCBSECmIFEQKIgWRgkhBpCBSECmIFEQKIgWRgkhBpCBSECmIFEQKIgWRgkhBpCBSECmIFEQKIgWRgkhBpCBSECmIFEQKIgWRgkhBpCBSECmIFEQKIgWRgkhBpCBSECmIFEQKIgWRgkhBpCBSECmIFEQKIgWRgsgWZGHd81r+ce8t+3j+ZrsYrM/9AMx3AGOMZZqmE/DGai+LVdvJeANOY4zF039H1sW7vWyanYFn4MR1D/E9yGZnA5FfhiEBfgO20QT8sY3jjAAAAABJRU5ErkJggg=="
      />
      <image
        id="image2_63721_144147"
        width={60}
        height={60}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAC4jAAAuIwF4pT92AAADoUlEQVRoQ+2b61LbMBBGj3IhoUAphbbT93+6Ti8DoZCEXNwfq43WshyHUizi+pvZ8SWO2ONd2WH82RVFwf+kUdMBKTnnXNMxr63iLyvl9n3PgFnA7LBGhV0echJqgT2sAwZ+add3hyW++tqykBpbu70PPAnsnBsgcANgGIU9AbmANTaJ2ALbOujKHDawI2AMnJgY+dBjoF1ohdgicGtgBTyZWAE455LQJWDfxgo7AabAO+AMOPX7TqhWui3ZFl4jgHPg0YTz+5PQO+Bozo4RwAvg0sd7BH7qPx/S3ny2SWt1Vwjsb2AG3CI56fE2dopbWqt7gsBdAp+AG+Cj3z6lXOU2pQBrYAk8AHfATwJLaT4755ytsgXWCg+R1j0DPiDAX4HPwBVwTpjPOVpa23kJ3AO/kHwx+5dIW6/jAVIVHiJAp0gbXwNfEOhrpM0nhJbOAbwBFkgrT/1nWvF7v9QO1FsWUAXWCo+Rgc4Q6CukrW/ID6wtvSBUdoG09jlSqNQ1BvDA5oKlFy2tsl6lz31c8DaAN0h+IJW9INxJdLol80v9lrbQ9l48iSI3MMg8nRJyGpOAtReuVEvr0oLbGJn1NmFVOh9tLiOzrj+KkrnVVTgVdiAbOVSXlwVN5nfofTT+Yi5QVV1RiNYragLODfbP1QR8bGosUNeAG9UDd109cNfVA3ddPXDX1QN3XT1w19UDd109cNfVA3ddPXDX1QMfuWrdO6om4MYBjk1NwKoYPPeJiD0c1stR8XVY1VkP4wHsvvgPtK04hy3hKb992p/MMQauGyxlAIP2nyBqXprD2ix13Z6AilIVtoOq8UvNX0vCk/ccz4dtbgsTamRZEcB3Fa64eIqiKLyPVKuqsEs/4IMPNZA8kRdYPR4zH2pkmRPcOyVola2wbeMVAvvoB7tF/BMgf0h9WjmAYxfPD8S6dIeY1OZI/gpcUmoOq8tNYa0Pao6YR9QlA+1CK3Ds0/qGmNNmSN5PhPm8t8J69rS6d5TdMrcE66G1F7Ql29KxE+87kp8FPqjCatp8RAbAb88QC9OE4KhVvTa4TXyf1zKucMU7vQP2F664pUFOgFZbYXNYlqB8nalz0y6Q/JO3ppJB3BjU1I1nPVq6bWFzAEOzX3pDjUm84oiPbMSxL2tAmLttw6oKE6kfRHsd8XWvAMR2oEG0jVm2rcIsbYvvtp/9zsPuw+pbLbkg62ThX/ZWS53ewjtLcBhcSs8GPnYd+v9wZ/QHTbqvfA0XAmsAAAAASUVORK5CYII="
      />
      <image
        id="image3_63721_144147"
        width={46}
        height={46}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAwUlEQVRoQ+3ZsQkCMRyF8S8iZAm765zAzr0cwJ3sLG8BN8gQSfW3CIdeZ/VM4P0gTSDwcXDVSxFBSikDJyAzpgaUiGjbRaLHXoAbPX5EBbgD63f8AjyACsSgpwJP4ArkiADgDLx+ePzvU+kfeIkIDsxj9x/OFL7jcDWHqzlczeFqDldzuJrD1Ryu5nA1h6s5XM3hag5Xc7iaw9UcruZwNYcLNPre2aCH7y4G1YCVPtIWgCOf1RYmWpbTtFv+Ni/P5g1xTodLg4W2uAAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>

);

ChipBrandedDocSvg.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

/**
 * Star / Favorite SVG icon (16x16)
 */
export const ChipStarSvg = ({
  size = 16,
  fill = 'currentColor',
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path
      d="M8 1.5L9.9 5.4L14.2 6.0L11.1 9.0L11.8 13.3L8 11.3L4.2 13.3L4.9 9.0L1.8 6.0L6.1 5.4L8 1.5Z"
      fill={fill}
      stroke={fill}
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
  </svg>
);

ChipStarSvg.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
};

/* ==========================================================================
   MAIN CHIP COMPONENT
   ========================================================================== */

/**
 * KPMG Design System - Chip Component
 * 
 * Reusable, accessible, and scalable chip component.
 * Implements Filter chips, Input chips, Assistive chips, and Suggestion chips.
 */
export const Chip = forwardRef(({
  type = 'filter',
  styleType = 'outlined',
  configuration,
  selected = false,
  disabled = false,
  state,
  label = 'Label',
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  isBranded = false,
  onDelete,
  onTrailingClick,
  onClick,
  onKeyDown,
  className = '',
  style = {},
  id,
  'aria-label': ariaLabel,
  ...restProps
}, ref) => {
  // Normalize parameters
  const normalizedType = (type || 'filter').toLowerCase();
  const normalizedStyle = (styleType || 'outlined').toLowerCase();
  const isElevated = normalizedStyle === 'elevated';
  const isIconOnly = iconOnly || configuration === 'icon-only' || configuration === 'Icon only';
  const isComponentDisabled = disabled || state === 'disabled';

  // Resolve configuration if specified, or auto-detect based on icons & flags
  let resolvedHasLeading = false;
  let resolvedHasTrailing = false;

  if (configuration) {
    const configLower = configuration.toLowerCase();
    if (configLower.includes('icon only') || configLower === 'icon-only') {
      resolvedHasTrailing = true;
    } else if (configLower.includes('icons') || configLower === 'both-icons' || configLower === 'both') {
      resolvedHasLeading = true;
      resolvedHasTrailing = true;
    } else if (configLower.includes('leading') || configLower === 'leading-icon') {
      resolvedHasLeading = true;
    } else if (configLower.includes('trailing') || configLower === 'trailing-icon') {
      resolvedHasTrailing = true;
    }
  } else {
    // Auto-detect based on props
    if (isIconOnly) {
      resolvedHasTrailing = true;
    } else {
      if (leadingIcon !== undefined && leadingIcon !== null && leadingIcon !== false) {
        resolvedHasLeading = true;
      }
      if (trailingIcon !== undefined && trailingIcon !== null && trailingIcon !== false) {
        resolvedHasTrailing = true;
      }
      // If neither is explicitly provided:
      // In Filter chips, if selected=true and leadingIcon not specified false, default to Checkmark
      if (normalizedType === 'filter' && leadingIcon === undefined && selected) {
        resolvedHasLeading = true;
      }
    }
  }

  // Handle keyboard events (Enter or Space)
  const handleKeyDown = (e) => {
    if (isComponentDisabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  // Trailing icon click handler (for delete/dismiss)
  const handleTrailingClick = (e) => {
    e.stopPropagation(); // prevent bubbling to chip click
    if (isComponentDisabled) return;

    if (onDelete) {
      onDelete(e);
    } else if (onTrailingClick) {
      onTrailingClick(e);
    } else if (onClick) {
      onClick(e);
    }
  };

  // Build modifier classes
  const chipClasses = [
    'kpmg-chip',
    isElevated ? 'kpmg-chip--elevated' : 'kpmg-chip--outlined',
    selected ? 'kpmg-chip--selected' : '',
    isComponentDisabled ? 'kpmg-chip--disabled' : '',
    isIconOnly ? 'kpmg-chip--icon-only' : '',
    state ? `kpmg-chip--state-${state.toLowerCase()}` : '',
    `kpmg-chip--type-${normalizedType}`,
    className,
  ].filter(Boolean).join(' ');

  // Render leading icon slot
  const renderLeadingIcon = () => {
    if (!resolvedHasLeading) return null;

    let iconElement = null;
    if (isBranded || configuration?.toLowerCase().includes('branded')) {
      iconElement = <ChipBrandedDocSvg />;
    } else if (React.isValidElement(leadingIcon)) {
      iconElement = leadingIcon;
    } else {
      // Default to Checkmark SVG
      iconElement = <ChipCheckmarkSvg />;
    }

    return (
      <span className="kpmg-chip__leading-icon" aria-hidden="true">
        {iconElement}
      </span>
    );
  };

  // Render trailing icon slot
  const renderTrailingIcon = () => {
    if (!resolvedHasTrailing) return null;

    let iconElement = null;
    if (React.isValidElement(trailingIcon)) {
      iconElement = trailingIcon;
    } else {
      // Default to Dismiss ('X') SVG
      iconElement = <ChipDismissSvg />;
    }

    // If onDelete or onTrailingClick is supplied, render as interactive sub-button
    if (onDelete || onTrailingClick) {
      return (
        <button
          type="button"
          className="kpmg-chip__trailing-button"
          onClick={handleTrailingClick}
          disabled={isComponentDisabled}
          aria-label={typeof label === 'string' ? `Remove ${label}` : 'Remove'}
          tabIndex={isComponentDisabled ? -1 : 0}
        >
          {iconElement}
        </button>
      );
    }

    return (
      <span className="kpmg-chip__trailing-icon" aria-hidden="true">
        {iconElement}
      </span>
    );
  };

  // Determine accessibility attributes
  const isInteractive = Boolean(onClick);
  const a11yRole = isInteractive
    ? (normalizedType === 'filter' ? 'checkbox' : 'button')
    : undefined;

  return (
    <div
      ref={ref}
      id={id}
      className={chipClasses}
      style={style}
      role={a11yRole}
      aria-checked={normalizedType === 'filter' ? selected : undefined}
      aria-pressed={normalizedType !== 'filter' && isInteractive ? selected : undefined}
      aria-disabled={isComponentDisabled ? true : undefined}
      aria-label={ariaLabel || (isIconOnly && typeof label === 'string' ? label : undefined)}
      tabIndex={isComponentDisabled ? -1 : 0}
      onClick={isComponentDisabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      <div className="kpmg-chip__content">
        {renderLeadingIcon()}
        {!isIconOnly && (
          <div className="kpmg-chip__label">
            <span className="kpmg-chip__label-text">{label}</span>
          </div>
        )}
        {renderTrailingIcon()}
      </div>
    </div>
  );
});

Chip.displayName = 'Chip';

Chip.propTypes = {
  /** Type of chip: 'filter' (toggleable), 'input' (tags with delete), 'assistive' (quick actions), 'suggestion' (prompt pills) */
  type: PropTypes.oneOf(['filter', 'input', 'assistive', 'suggestion', 'Filter', 'Input', 'Assistive', 'Suggestion']),
  /** Visual presentation style: 'outlined' (1px border) or 'elevated' (subtle elevation shadow) */
  styleType: PropTypes.oneOf(['outlined', 'elevated', 'Outlined', 'Elevated']),
  /** Explicit layout configuration: 'icon-only', 'label-only', 'leading-icon', 'trailing-icon', 'both-icons', etc. */
  configuration: PropTypes.string,
  /** Whether the chip is currently selected */
  selected: PropTypes.bool,
  /** Whether the chip is disabled */
  disabled: PropTypes.bool,
  /** Force a visual state for preview or testing ('enabled', 'hovered', 'pressed', 'dragged', 'disabled') */
  state: PropTypes.oneOf(['enabled', 'hovered', 'pressed', 'dragged', 'disabled', 'Enabled', 'Hovered', 'Pressed', 'Dragged', 'Disabled']),
  /** Label content */
  label: PropTypes.node,
  /** Leading icon: true for default checkmark, or custom React element */
  leadingIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  /** Trailing icon: true for default dismiss, or custom React element */
  trailingIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  /** Whether this chip is an icon-only chip (40px compact width) */
  iconOnly: PropTypes.bool,
  /** Whether the leading icon should be a branded/product logo */
  isBranded: PropTypes.bool,
  /** Callback fired when trailing delete/dismiss icon is clicked */
  onDelete: PropTypes.func,
  /** Callback fired when trailing icon is clicked */
  onTrailingClick: PropTypes.func,
  /** Click handler for the chip itself */
  onClick: PropTypes.func,
  /** Key down handler for accessibility */
  onKeyDown: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Inline style overrides */
  style: PropTypes.object,
  /** DOM ID */
  id: PropTypes.string,
  /** ARIA label for screen readers */
  'aria-label': PropTypes.string,
};

export default Chip;
