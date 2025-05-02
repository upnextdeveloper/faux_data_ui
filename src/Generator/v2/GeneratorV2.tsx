import React from "react";
import { Table } from "react-bootstrap";

function GeneratorV2() {
    return (
        <>
            <table id="generatorTable"
                data-pagination="true"
                data-search="true"
                data-show-toggle="true"
                data-toolbar=".toolbar"
                data-use-row-attr-func="true"
                data-reorderable-rows="true">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Column Name</th>
                        <th>Data Type</th>
                        <th>Required</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>Test</tr>
                    <tr>Test 2</tr>
                </tbody>
            </table>
        </>
    )
}

export default GeneratorV2;