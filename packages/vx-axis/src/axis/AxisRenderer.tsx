import React from 'react';
import cx from 'classnames';
import { Line } from '@vx/shape';
import { Text } from '@vx/text';

import { TextProps } from '@vx/text/lib/Text';
import getLabelTransform from '../utils/getLabelTransform';
import { AxisRendererProps, AxisScale } from '../types';
import Ticks from './Ticks';

const defaultTextProps: Partial<TextProps> = {
  textAnchor: 'middle',
  fontFamily: 'Arial',
  fontSize: 10,
  fill: '#222',
};

export default function AxisRenderer<Scale extends AxisScale>({
  axisFromPoint,
  axisLineClassName,
  axisToPoint,
  hideAxisLine,
  hideTicks,
  horizontal,
  label = '',
  labelClassName,
  labelOffset = 14,
  labelProps = defaultTextProps,
  orientation,
  scale,
  stroke = '#222',
  strokeDasharray,
  strokeWidth = 1,
  tickClassName,
  tickComponent,
  tickLabelProps = (/** tickValue, index */) => defaultTextProps,
  tickLength,
  tickStroke = '#222',
  tickTransform,
  ticks,
  ticksComponent = Ticks,
}: AxisRendererProps<Scale>) {
  // compute the max tick label size to compute label offset
  const allTickLabelProps = ticks.map(({ value, index }) => tickLabelProps(value, index));
  const maxTickLabelFontSize = Math.max(
    10,
    ...allTickLabelProps.map(props => (typeof props.fontSize === 'number' ? props.fontSize : 0)),
  );
  return (
    <>
      {ticksComponent({
        hideTicks,
        horizontal,
        orientation,
        scale,
        tickClassName,
        tickComponent,
        tickLabelProps: allTickLabelProps,
        tickStroke,
        tickTransform,
        ticks,
      })}

      {!hideAxisLine && (
        <Line
          className={cx('vx-axis-line', axisLineClassName)}
          from={axisFromPoint}
          to={axisToPoint}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
        />
      )}

      {label && (
        <Text
          className={cx('vx-axis-label', labelClassName)}
          {...getLabelTransform({
            labelOffset,
            labelProps,
            orientation,
            range: scale.range(),
            tickLabelFontSize: maxTickLabelFontSize,
            tickLength,
          })}
          {...labelProps}
        >
          {label}
        </Text>
      )}
    </>
  );
}
