import React, { PropTypes, Component } from 'react';
import { pickByRange } from '../utils/utils';

export default options => ComposedComponent => {
    class ResizeText extends Component {
        getFontSize(text) {
            const pickFontSizeByRange = pickByRange(options);

            return pickFontSizeByRange(text);
        }

        render() {
            const { text } = this.props;
            const fontSize = this.getFontSize(text);

            return (
                <ComposedComponent
                    text={text}
                    fontSize={fontSize}
                />
            );
        }
    }

    return ResizeText;
}

