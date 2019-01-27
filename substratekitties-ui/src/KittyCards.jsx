import React from 'react';
import { ReactiveComponent, Rspan, Hash } from 'oo7-react';
const { Pretty } = require('./Pretty');
import { Card, Icon, Image } from 'semantic-ui-react'
import { pretty, runtime, secretStore } from 'oo7-substrate';
import { BalanceBond } from "./BalanceBond";
import Identicon from 'polkadot-identicon';
import { KittyAvatar } from './avatars';
import './KittyCards.css'

class KittyCard extends ReactiveComponent {
    constructor(props) {
        super(['kitty', 'owner'])
    }

    readyRender() {
        let kitty = this.state.kitty;

        return <Card>
                    <KittyAvatar dna={kitty.dna} />
                    <Card.Content>
                        <Card.Header><Pretty value={kitty.id} className="limit-dna" /></Card.Header>
                        <Rspan>
                            <b>Owner</b>: {secretStore().find(this.state.owner).name}
                        </Rspan>
                        &nbsp;
                        <Identicon key={this.state.owner} account={this.state.owner} size={16}/>
                    </Card.Content>
                    <Card.Content extra>
                        <Pretty value={kitty.price} prefix="$" />
                    </Card.Content>
                </Card>;
    }
}

class KittyWrap extends ReactiveComponent {
    constructor(props) {
        super(['hash'])
    }

    readyRender() {
        // one level of indirection: convert a given hash
        // to the request of the actual kitty data and who it belongs to
        return <KittyCard
            kitty={runtime.substratekitties.kitties(this.state.hash)}
            owner={runtime.substratekitties.kittyOwner(this.state.hash)}
        />
    }
}
export class KittyCards extends ReactiveComponent {
    constructor(props) {
        super(['count'])
    }
    unreadyRender() {
        return <span>No kittens found yet</span>
    }
    readyRender() {
        let kitties = [];
        for (var i=0; i < this.state.count; i++){
            kitties.push(
                <div className="column" key={i}>
                    <KittyWrap hash={runtime.substratekitties.allKittiesArray(i)} />
                </div>
            );
        }
        
        return <div className="ui stackable six column grid">{kitties}</div>;
    }
}
