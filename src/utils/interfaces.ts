export interface ActionInterface {
	type: string;
	payload: any;
}

export interface MessageInterface {
	type: 'info' | 'error' | 'success';
	text: string;
}

export interface NewProductInterface {
	name: string;
	inventory: number;
	min: number;
	max: number;
	enabled: boolean;
}

export interface ProductInterface {
	id: string;
	name: string;
	inventory: number;
	min: number;
	max: number;
	enabled: boolean;
}

export interface ProductResponseInterface {
	items: ProductInterface[];
	currentPage: number;
	totalCount: number;
}

interface BoughtProductInterface {
	id: string;
	quantity: number;
}

export interface HistoryInterface {
	id: string;
	clientName: string;
	clientIdType: string;
	clientId: string;
	products: BoughtProductInterface[];
	date: string;
}

export interface HistoryResponseInterface {
	items: HistoryInterface[];
	currentPage: number;
	totalCount: number;
}
