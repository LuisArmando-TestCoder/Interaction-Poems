import threeJSImports from "../../static/pythonTransformer/threeJSImports.json"

interface ThreeJSImport {
    name: string,
    link: string
}

export default function getScene(sceneName: string): Promise<Function> {
    return new Promise((resolve, reject) => {
        for (const folder in threeJSImports) {
            const threeJSScenes: ThreeJSImport[] = threeJSImports[folder]
            for (const threeJSScene of threeJSScenes) {
                if (sceneName === threeJSScene.name) {
                    import(`../scenes/${folder}/${sceneName}`)
                    .then(scene => resolve(scene.default))
                    .catch(reject)

                    return
                }

            }
        }

        reject(new Error(`${sceneName} doesn't exists`))
    })
}