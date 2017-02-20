import * as React from 'react';
import {BehaviorSubject, Subscription, Observable} from 'rxjs';
import shallowEqual from './shallowEqual';

interface PropsMapper<EP, IP> {
    (externalProps: EP): Observable<IP>
}

export interface ConnectedComponent<EP> {
    new(props: EP): React.Component<EP, {}>
}

function wrapper<EP, IP, WC>(propsMapper: PropsMapper<EP, IP>,
                             wrappedComponent: React.StatelessComponent<IP>): ConnectedComponent<EP> {

    return class extends React.Component<EP, {}> {
        private externalProps$: BehaviorSubject<EP>;
        private subscription: Subscription;
        private internalProps: IP;

        componentWillMount() {
            this.externalProps$ = new BehaviorSubject(this.props);
            const internalProps$: Observable<IP> = this.externalProps$
                .mergeMap(propsMapper)
                .distinctUntilChanged(shallowEqual);
            this.subscription = internalProps$.subscribe(internalProps => {
                this.internalProps = internalProps;
                this.forceUpdate()
            })
        }

        componentWillReceiveProps(nextProps) {
            this.externalProps$.next(nextProps)
        }

        componentWillUnmount() {
            this.subscription.unsubscribe()
        }

        render() {
            if (this.internalProps !== undefined)
                return wrappedComponent(this.internalProps);
            else
                return <div>Loading...</div>
        }

    }
}

export function connect<EP, IP>(propsMapper: PropsMapper<EP, IP>) {
    return function (wrappedComponent: React.StatelessComponent<IP>): ConnectedComponent<EP> {
        return wrapper(propsMapper, wrappedComponent)
    }
}

// const wrapWithLoader = WrappedComponent => props => props
//     ? <WrappedComponent {...props} > </WrappedComponent>
//     : <div>Loading...(fancy loader gif here)</div>;
//
// export const connectWithLoader = propsMapper => wrappedComponent => wrapper(propsMapper, wrapWithLoader(wrappedComponent));
