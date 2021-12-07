import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import { JsonRpc } from 'eosjs';
import { UALProvider } from 'ual-reactjs-renderer';
import { Wax } from "@eosdacio/ual-wax";
import { Anchor } from 'ual-anchor';
import { Ledger } from 'ual-ledger';
import { Scatter } from 'ual-scatter';
import { Starteos } from 'ual-starteos';
import { Wombat } from 'ual-wombat';

const appName = "wax-ual-demo";

const chains = {
    chainId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
    rpcEndpoints: [
        {
            protocol: 'https',
            host: 'wax.greymass.com',
            port: 443,
        }
    ],
};

const endpoint = `${chains.rpcEndpoints[0].protocol}://${chains.rpcEndpoints[0].host}:${chains.rpcEndpoints[0].port}`;
const rpc = new JsonRpc(endpoint);

const wcw = new Wax([chains]);
const anchor = new Anchor([chains], { appName: appName });
const ledger  = new Ledger([chains]);
const scatter = new Scatter([chains], { appName: appName });
const starteos  = new Starteos([chains], { appName: appName });
const wombat  = new Wombat([chains], { appName: appName });

ReactDOM.render(
    <>
        <UALProvider
            appName={appName}
            authenticators={[wcw, anchor, ledger, scatter, starteos, wombat]}
            chains={[chains]}
        >
            <App rpc={rpc} />
        </UALProvider>
    </>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
