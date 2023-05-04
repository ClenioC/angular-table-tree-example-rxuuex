import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

interface FoodNode {
  name: string;
  count?: number;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Technology',
    count: 30,
    children: [
      { name: 'Software', count: 10 },
      { name: 'Hardware', count: 20 },
      {
        name: 'Operating Systems',
        children: [
          { name: 'Windows', count: 5 },
          { name: 'macOS', count: 15 },
          {
            name: 'Linux',
            children: [
              {
                name: 'Distributions',
                children: [
                  { name: 'Ubuntu', count: 5 },
                  { name: 'Debian', count: 10 },
                  {
                    name: 'Arch',
                    children: [
                      { name: 'Arch Linux', count: 5 },
                      { name: 'Manjaro', count: 10 },
                      {
                        name: 'Arch Based',
                        children: [
                          { name: 'EndeavourOS', count: 3 },
                          { name: 'Garuda', count: 6 },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Computers',
    children: [
      {
        name: 'Desktop',
        children: [
          { name: 'Gaming Desktops', count: 10 },
          { name: 'Office Desktops', count: 20 },
        ],
      },
      {
        name: 'Laptops',
        children: [
          { name: 'Gaming Laptops', count: 30 },
          { name: 'Ultrabooks', count: 40 },
          {
            name: '2-in-1 Laptops',
            children: [
              { name: 'Tablet Mode', count: 5 },
              { name: 'Laptop Mode', count: 10 },
              {
                name: 'Convertible Laptops',
                children: [
                  { name: 'Lenovo Yoga', count: 2 },
                  { name: 'HP Spectre x360', count: 3 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  count: number;
  level: number;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.css'],
  templateUrl: 'table-basic-example.html',
})
export class TableBasicExample {
  // Define as colunas que serão exibidas na tabela
  displayedColumns: string[] = ['name', 'count'];

  // Função que transforma um nó da árvore em um objeto com as propriedades que serão exibidas na tabela
  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0, // Verifica se o nó possui filhos para serem expandidos
      name: node.name, // Nome do nó
      count: node.count, // Contagem do nó
      level: level, // Nível do nó
    };
  };

  // Define o controle da árvore, que será responsável por expandir e recolher os nós
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level, // Função que retorna o nível do nó
    (node) => node.expandable // Função que verifica se o nó é expansível
  );

  // Define o "achatador" da árvore, que transforma a árvore em um array linear de nós
  treeFlattener = new MatTreeFlattener(
    this.transformer, // Função transformadora definida acima
    (node) => node.level, // Função que retorna o nível do nó
    (node) => node.expandable, // Função que verifica se o nó é expansível
    (node) => node.children // Função que retorna os filhos do nó
  );

  // Define a fonte de dados da tabela, que é um objeto MatTreeFlatDataSource que recebe o controle e o "achatador" da árvore
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // Define o construtor do componente, que atribui os dados da árvore à fonte de dados da tabela
  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  // Função que verifica se o nó tem filhos e é, portanto, expansível
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
