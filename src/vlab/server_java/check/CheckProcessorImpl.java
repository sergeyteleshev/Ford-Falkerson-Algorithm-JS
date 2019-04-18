package vlab.server_java.check;

import jdk.nashorn.internal.parser.JSONParser;
import org.json.JSONObject;
import rlcp.check.ConditionForChecking;
import rlcp.generate.GeneratingResult;
import rlcp.server.processor.check.CheckProcessor;
import rlcp.server.processor.check.PreCheckProcessor;
import rlcp.server.processor.check.PreCheckProcessor.PreCheckResult;
import rlcp.server.processor.check.PreCheckResultAwareCheckProcessor;

import java.math.BigDecimal;

/**
 * Simple CheckProcessor implementation. Supposed to be changed as needed to provide
 * necessary Check method support.
 */
public class CheckProcessorImpl implements PreCheckResultAwareCheckProcessor<String> {
    @Override
    public CheckingSingleConditionResult checkSingleCondition(ConditionForChecking condition, String instructions, GeneratingResult generatingResult) throws Exception {
        //do check logic here
        MaxFlow m = new MaxFlow();
        String code = generatingResult.getCode();
        JSONObject jsonObj = new JSONObject(code);
        int[][] edges = (int[][]) jsonObj.get("edges");
        int[] nodes = (int[]) jsonObj.get("nodes");

        int maxFlow = m.fordFulkerson(edges, nodes[0], nodes[nodes.length - 1]);
        BigDecimal points;
        String comment;

        if((int) jsonObj.get("maxFlow") == maxFlow)
        {
            points = new BigDecimal(1.0);
            comment = "it's ok " + maxFlow;
        }
        else
        {
            points = new BigDecimal(0);
            comment = "it's not ok";
        }

        return new CheckingSingleConditionResult(points, comment);
    }

    @Override
    public void setPreCheckResult(PreCheckResult<String> preCheckResult) {}
}
