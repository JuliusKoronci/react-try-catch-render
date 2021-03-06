/**
 * Created by g.kosharov on 28.3.2016
 */
export default function tryCatch(React, ErrorHandler, handlerOptions) {
    if (!React || !React.Component) {
        throw new Error('arguments[0] for react-try-catch-render does not look like React.');
    }
    if (typeof ErrorHandler !== 'function') {
        throw new Error('arguments[1] for react-try-catch-render does not look like a function.');
    }
    /**
     * Implementation of the try/catch wrapper
     * @param  {[React.Component]} component The ES6 React.Component
     */
    return function wrapWithTryCatch(Component) {
        const originalRender = Component.prototype.render;

        Component.prototype.render = function tryRender() {
            try {
                return originalRender.apply(this, arguments);
            } catch (err) {
                // Log an error
                console.error(err);
                if(ErrorHandler.prototype && ErrorHandler.prototype.render) {
                    return React.createElement(ErrorHandler, handlerOptions);
                }
                // ErrorHandler is at least a valid function
                return ErrorHandler(err);
            }
        };
        return Component;
    };
}
