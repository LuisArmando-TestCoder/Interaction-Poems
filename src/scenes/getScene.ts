import threeJSImports from "../../static/pythonTransformer/threeJSImports.json"

interface ThreeJSImport {
    name: string,
    link: string
}

export default function getScene(sceneName: string): Promise<Function> {
    return new Promise((resolve, reject) => {
        for (const folder in threeJSImports) {
            const threeJSScenes: ThreeJSImport[] = threeJSImports[folder]

            threeJSScenes.forEach(threeJSScene => {
                if (sceneName === threeJSScene.name) {
                    import(`./${folder}/${sceneName}`)
                    .then(resolve)
                    .catch(reject)

                    return;
                }
            })
        }

        reject(new Error(`${sceneName} doesn't exists`))
    })
}