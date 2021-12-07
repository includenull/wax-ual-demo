import React, {useContext} from 'react';
import {RpcError} from 'eosjs';
import {UALContext} from "ual-reactjs-renderer";

const App = () => {
    const ual = useContext(UALContext);

    const login = () => {
        ual.logout();
        ual.showModal();
    }

    const logout = () => {
        ual.logout();
    }

    const testTransaction = async () => {
        try {
            const { activeUser } = ual;

            const { accountName } = activeUser;
            let { requestPermission } = activeUser;
            if (!requestPermission && activeUser.scatter) {
                // workaround for scatter
                requestPermission = activeUser.scatter.identity.accounts[0].authority;
            }

            // submit the transaction, do not broadcast
            const transaction = await activeUser.signTransaction({
                actions: [{
                    account: "boost.wax",
                    name: "noop",
                    authorization: [
                        {
                            actor: accountName,
                            permission: requestPermission,
                        }
                    ],
                    data: {}
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 120,
            });
            console.log(transaction);
            alert("Transaction ID: " + transaction?.transactionId);
        } catch (e) {
            alert(e.toString());
            console.error(e);
            if (e instanceof RpcError)
                console.log(JSON.stringify(e.json, null, 2));
        }
    }

    return (
        <div className="app">
            {ual?.activeUser ?
                <>
                    <p>
                        <div>Welcome, {ual.activeUser.accountName}</div>
                        <div><button onClick={() => logout()}>Logout</button></div>
                    </p>
                    <p>
                        <div>Test transaction:</div>
                        <div><button onClick={() => testTransaction()}>Sign</button></div>
                    </p>
                </>
            :
                <button onClick={() => login()}>Login</button>
            }
        </div>
    );
}

export default App;
