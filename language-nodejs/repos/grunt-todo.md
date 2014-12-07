

```coffee
grunt.registerMultiTask "todo", "Find Todo, FIXME, and Note inside project files", ->
    oOptions = @options
        masks: [
                name: "FIX"
                pattern: /FIXME/
                color: "red"
            ,
                name: "TODO"
                pattern: /TODO/
                color: "yellow"
            ,
                name: "NOTE"
                pattern: /NOTE/
                color: "blue"
        ]
        file: no
    aAllowedColors = [
        "black"
        "red"
        "green"
        "yellow"
        "blue"
        "magenta"
        "cyan"
        "white"
        "gray"
    ]
    # sGithubox, aMarks, aLogFileLines
    aLogFileLines = []
    aMarks = []

    if oOptions.file
        aLogFileLines.push "#"+(oOptions.title or 'Grunt TODO')
        aLogFileLines.push ""

    aMarks = for oMark in oOptions.marks
        name: oMark.name or oMark.pattern.toString()
        color: if aAllowedColors.indexOf(oMark.color.toLower()) is -1 then 'cyan' else oMark.color.toLowerCase()
        regex: if oMark.pattern instanceof RegExp then oMark.pattern else new RegExp oMark.pattern

    @fileSrc
        .filter (sFilePath) ->
            grunt.file.exists(sFilePath) and grunt.file.isFile(isFilePath)
        .forEach(sFilePath) ->
            aResults = []
            aFileResults = []
            grunt.file
                .read sFilePath
                .split /\r*\n/
                .map (sLine, iIndex) ->
                    # 对每行进行 mark 匹配，截取字段
                    for oMark in aMarks
                        if oResult = oMark.regex.exec sLine
                            sLine = 

                            aResults.push [
                                chalk.gray "\tline #{ iIndex + 1 }"
                                chalk[ oMark.color ] oMark.name
                                chalk.white.italic if sLine.trim().length > 80 then "#{ sLine.trim().substr( 0, 80 ) }…" else sLine.trim()
                            ]

                            aFileResults.push "- #{ sGithubBox } **#{ oMark.name }** `(line #{ iIndex + 1 })` #{ sLine }" if oOptions.file

            # log to console
            if aResults.length
                grunt.log.writeln()
                grunt.log.writeln chalk.underline sFilePath
                grunt.log.writeln()
                grunt.log.writeln table aResults

            # log to file
            if oOptions.file and aFileResults.length
                aLogFileLines.push "## #{ sFilePath }"
                aLogFileLines.push ""
                aLogFileLines = aLogFileLines.concat aFileResults
                aLogFileLines.push ""

        # write all scan logs to file
        if oOptions.file
            grunt.file.write oOptions.file, aLogFileLines.join "\n"
            grunt.log.writeln()
            grunt.log.writeln "Logged in #{ chalk.yellow( oOptions.file ) }"
```