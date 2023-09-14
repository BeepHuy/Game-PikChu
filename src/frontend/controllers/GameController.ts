import autobind from "autobind-decorator";
import { GameItem, GameItemStatus } from "../models/GameItem";
import _ from "lodash";

export class GameController {
    private items: GameItem[] = []; // lưu danh sach game

    constructor(items: GameItem[], public element: HTMLElement) {
        this.initGame(items);
    }
    // gán các thành phần o game
    initGame(initData: GameItem[]): void {
        for (const item of initData) {
            this.items.push(item);
            this.items.push(new GameItem(item.id, item.divId, item.image));
        }

        let id : number = 1;
        this.items.forEach(it => {
            it.status = GameItemStatus.Close;
            it.divId = 'd' + id;
            id++;
        });
    }
    // (gọi) khi reset game
    reinitGame(): void {
        this.items.forEach(item=> {
            item.status = GameItemStatus.Close;
            item.isMatched = false;
        });
        this.shuffle();
    }
    // Check xem người dùng thắng game hay ko
    isWinGame(): boolean {
        return this.items.filter(item => item.status === GameItemStatus.Open).length === this.items.length;
        
    }
    
    // Hiên thị giao diện web
    renderHTML(rootElement: HTMLElement, item: GameItem){
        // <div class="col-2 gameItem m-2 p1 text-center">
        //     <img src="images/1.png" alt="" class="img-fluid">
        // </div>
        const divItem : HTMLDivElement = document.createElement('div');
        divItem.className = 'col-2 gameItem m-2 p1 text-center';
        divItem.id = item.divId;
        divItem.addEventListener('click', this.processGameItemClicked);

        const imgItem: HTMLImageElement = document.createElement('img');
        imgItem.src = `images/${item.image}`;
        imgItem.className = 'img-fluid invisible';
        
        item.imageElement = imgItem;
        divItem.appendChild(imgItem);
        rootElement.appendChild(divItem);
    }
    renderResetButton(rooElement: HTMLElement): void {
        let button : HTMLButtonElement = 
        rooElement.querySelector('button#reset') as HTMLButtonElement;

        if (button) {
            button.addEventListener('click', this.processResetButtonClicked);
        }
    }
    // Show all o game
    renderGameBoard(): void {
        this.shuffle();
        let boardDiv: HTMLElement = this.element.querySelector('#board') as HTMLElement;
        if (boardDiv) {
            this.items.forEach(it => {
                this.renderHTML(boardDiv, it);
            });
        }
        this.renderResetButton(this.element);
    }
    // kiểm tra sự trùng lặp các thành phần trong Game
    isMatched(id: number, imgElement: HTMLImageElement): boolean {
        let openedItems : GameItem[] = this.items.filter(item => {
            if (item.status === GameItemStatus.Open && !item.isMatched) {
                return item;
            }
        });

        if (openedItems.length == 2) {
            let checkMatchedFilter = openedItems.filter(item=>item.id == id);

            if (checkMatchedFilter.length <2) {
                openedItems.forEach(item => {
                    this.changeMatchedBackgroud(item.imageElement, false)
                });
                setTimeout(()=> 
                    openedItems.forEach(item => {
                        if (item.imageElement) {
                            item.imageElement.className = 'img-fluid invisible'
                            item.status = GameItemStatus.Close;
                            item.isMatched = false;

                            this.changeMatchedBackgroud(item.imageElement);
                        }
                    }), 500)
            } else {
                openedItems.forEach(item=> {
                    item.isMatched = true;
                    this.changeMatchedBackgroud(item.imageElement);
                });
                return true;
            }
        }
        return false;
    }
    // thay đổi màu nền
    changeMatchedBackgroud(imaElement: HTMLElement | null, isMatched: boolean = true) {
        if (imaElement?.parentElement) {
            if (isMatched) {
                imaElement.parentElement.className = 'col-2 gameItem m-1 p-1 text-center';
            }else {
                imaElement.parentElement.className = 
                'col-2 gameItem m-1 p-1 text-center unmatched';
            }
        }
    }
    @autobind
    processGameItemClicked(event: Event){
        let element : HTMLElement | null = event.target as HTMLElement;

        if (element.tagName === 'img') {
            element = element.parentElement;
        }
        for (const item  of this.items) {
            if (item.divId == element?.id && !item.isMatched
                && item.status === GameItemStatus.Close) {
                    item.status = GameItemStatus.Open;

                    let imgElement = element.querySelector('img');

                    if (imgElement) {
                        imgElement.className = 'img-fluid visible';

                        this.isMatched(item.id, imgElement);
                    }
                }
        }
    }
    @autobind
    processResetButtonClicked(event: Event): void{
        this.reinitGame();

        const boardElement: HTMLElement = document.querySelector('#board') as HTMLElement;
        
        boardElement.innerHTML = '';
        this.renderGameBoard();
    }
    shuffle() {
        this.items = _.shuffle(this.items);
    }
}